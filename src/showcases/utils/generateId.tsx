import React, {ComponentType} from 'react';

interface Options {
  exclude?: string[]
}

export default function generateId(
  baseId: string,
  props: {[key: string]: any},
  options: Options = {}
) : string {
  let result = baseId;
  const {exclude} = options;
  for(const key of Object.keys(props)) {
    if (exclude?.includes(key)) continue;
    const value = props[key];
    if (typeof(value) === 'function') continue;
    const stringValue = String(value).replace(/[^a-zA-Z0-9]/g,'_');
    result += '-'+key+'-'+stringValue;
  }

  return result;
}

interface WithId {
  id?: string
}

export function autoGenerateId(idBase: string, options: Options = {}) {
  return function HOC<P extends WithId>(Comp: ComponentType<P>) : ComponentType<P> {
    return function ({id: maybeId, ...rest} : P) {
      const id = maybeId ?? generateId(idBase, rest, options);
      const props = {...rest, id} as P;
      return <Comp {...props} />;
    }
  }
}
