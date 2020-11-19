import React, {Fragment} from 'react';
import {FieldsDef, FieldDef} from './types';

export function ComponentVariants<P>({Component, props, fields} : {Component: React.ComponentType<P>, props: P, fields: FieldsDef<P>}) {
  const variants = generateVariants(props, fields);
  const chunks = chunkVariants(variants, fields);
  console.log(chunks);
  return <div className="componentVariants">
    <p>Showing {variants.length} variants</p>
    <div className="variants" tabIndex={0}>
      {chunks.map((chunk,i) =>
      <div key={i}>
        <VariantChunkDescription chunk={chunk} />
        {chunk.variants.map((variant,i) => <Component key={i} {...variant} />)}
      </div>
      )}
    </div>
  </div>;
}

function VariantChunkDescription<P>({chunk} : {chunk: VariantChunk<P>}) {
  const {props, changingProperty} = chunk;
  return <p>
    {Object.entries(props).map(([key, value]) =>
      <KeyValue key={key} keyName={key} value={JSON.stringify(value)} />
    )}
  {changingProperty && <KeyValue keyName={String(changingProperty.name)} value={changingProperty.values!.map(v => JSON.stringify(v)).join(", ")}/>}
  </p>
}

function KeyValue({keyName, value} : {keyName: string, value: any}) {
  return <> <em>{keyName}</em>: <strong>{value}</strong></>;
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
  props: Partial<P>
  changingProperty?: {
    name: keyof P
    values?: P[keyof P][]
  }
  variants: P[]
}

function chunkVariants<P>(variants: P[], fields: FieldsDef<P>) : VariantChunk<P>[] {
  const keys = Object.keys(fields) as (keyof P)[];
  const generatedKeys = keys.filter(key => fields[key].valueGenerator);
  console.log(generatedKeys);
  if (generatedKeys.length < 2) {
    return [toChunk(variants, generatedKeys)];
  };
  return splitWhenPropertyChanges(variants, generatedKeys[1]).map(variants => {
    return toChunk(variants, generatedKeys);
  });
}

function toChunk<P>(variants: P[], generatedKeys: (keyof P)[]) {
  return {
    props: pick(variants[0], generatedKeys.slice(1)),
    changingProperty: {
      name: generatedKeys[0],
      values: variants.map((v: P) => v[generatedKeys[0]]),
    },
    variants,
  }
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
