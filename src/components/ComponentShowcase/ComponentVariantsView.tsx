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
  const propEntries = Object.entries(props);
  return <p>
    {propEntries.map(([key, value], i) =>
      <KeyValue isFirst={i===0} key={key} keyName={key} value={JSON.stringify(value)} />
    )}
    {changingProperty && 
      <KeyValue isFirst={propEntries.length === 0} keyName={String(changingProperty.name)}
        value={listToString(changingProperty.values!)}/>}
  </p>
}

function KeyValue({keyName, value, isFirst} : {keyName: string, value: any, isFirst?: boolean}) {
  return <>{isFirst || ', '}<em>{keyName}</em>: <strong>{value}</strong></>;
}

function listToString<P>(values: P[]) : string {
  return values.map(v => JSON.stringify(v)).join(", ");
}
