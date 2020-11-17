import React, {Fragment} from 'react';
import {FieldsDef, FieldDef} from './types';

export function ComponentVariants<P>({Component, props, fields} : {Component: React.JSXElementConstructor<P>, props: P, fields: FieldsDef<P>}) {
  const variants = generateVariants(props, fields);
  const chunks = chunkVariants(variants, fields);
  return <div className="componentVariants">
    <p>Showing {variants.length} variants</p>
    {chunks.map((chunk,i) => 
    <div key={i}>
      <p>
        {Object.entries(chunk.props).map(([key, value]) => 
          <Fragment key={key}><em>{key}</em>: <strong>{JSON.stringify(value)}</strong>, </Fragment>
        )}
        {chunk.changingProperty && <><em>{chunk.changingProperty}</em>: <strong>*</strong></>}
      </p>
      {chunk.variants.map((variant,i) => <Component key={i} {...variant} />)}
    </div>
    )}
  </div>;

}

function generateVariants<P>(props: P, fields: FieldsDef<P>) : P[] {
  let variants : P[] = [props];
  const fieldDefs = Object.entries(fields) as [[keyof P, FieldDef<P[keyof P], any> ]];
  for (const [key, field] of fieldDefs) {
    if (!field.valueGenerator) continue;
    const values = field.valueGenerator();
    if (values.length === 0) continue;

    const currentVariants = variants;
    variants = values.flatMap(value =>
      currentVariants.map(variant => ({...variant, [key]: value}))
    )
  }
  return variants;
}

interface VariantChunk<P> {
  props: Partial<P>,
  changingProperty?: keyof P,
  variants: P[]
}

function chunkVariants<P>(variants: P[], fields: FieldsDef<P>) : VariantChunk<P>[] {
  const keys = Object.keys(fields) as (keyof P)[];
  const generatedKeys = keys.filter(key => fields[key].valueGenerator);
  if (generatedKeys.length <= 2) return [{props: variants[0], variants}];
  //Used the second field key to chunk the variants
  const staticProperties = generatedKeys.slice(1);

  return splitWhenPropertyChanges(variants, generatedKeys[1]).map(variants => {
    return {
      props: pick(variants[0], staticProperties),
      changingProperty: generatedKeys[0],
      variants,
    }
  });
}


function splitWhenPropertyChanges<P>(elements: P[], property: keyof P) : P[][] {
  const chunks = [];
  let start = 0;
  let lastValue = elements[0][property];
  for(let i = 0; i < elements.length; i++) {
    const variant = elements[i];
    if (variant[property] !== lastValue) {
      chunks.push(elements.slice(start, i));
      start = i;
      lastValue = variant[property];
    }
  }
  chunks.push(elements.slice(start, elements.length));
  return chunks;
}

function pick<P>(p: P, keys: (keyof P)[]): Partial<P> {
  const picked : Partial<P> = {};
  keys.forEach(key => picked[key] = p[key]);
  return picked;
}
