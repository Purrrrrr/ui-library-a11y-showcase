import React from 'react';
import {ComponentVariants, VariantChunk} from './utils/generateVariants';

export function ComponentVariantsView<P,A>({component, variants} : {component: React.ComponentType<P|A>, variants: ComponentVariants<P>}) {
  return <div className="componentVariants" tabIndex={0}>
    {variants.chunks.map((chunk,i) =>
    <ComponentVariantChunk key={i} component={component} chunk={chunk} />
  )}
</div>;
}

export function ComponentVariantChunk<P,A>({component: Component, chunk} : {component: React.ComponentType<P|A>,chunk: VariantChunk<P>}) {
  return <div className="componentVariantChunk">
    <VariantChunkDescription chunk={chunk} />
    {chunk.variants.map((variant,i) => <Component key={i} {...variant} />)}
  </div>
}

function VariantChunkDescription<P>({chunk} : {chunk: VariantChunk<P>}) {
  const {props, changingProperty} = chunk;
  return <p>
    {Object.entries(props).map(([key, value]) =>
      <KeyValue key={key} keyName={key} value={JSON.stringify(value)} />
    )}
    {changingProperty && 
      <KeyValue keyName={String(changingProperty.name)}
        value={listToString(changingProperty.values!)}/>}
  </p>
}

function KeyValue({keyName, value} : {keyName: string, value: any}) {
  return <> <em>{keyName}</em>: <strong>{value}</strong></>;
}

function listToString<P>(values: P[]) : string {
  return values.map(v => JSON.stringify(v)).join(", ");
}
