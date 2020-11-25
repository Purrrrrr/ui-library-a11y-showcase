export interface ComponentVariants<P> {
  count: number
  chunks: VariantChunk<P>[]
}

export interface VariantChunk<P> {
  props: Partial<P>
  changingProperty?: {
    name: keyof P
    values?: P[keyof P][]
  }
  variants: P[]
}

export type GeneratedValues<P> = {
  [k in keyof P] ?: P[k][]
}

export function generateVariants<P>(initialProps: P, generatedValues: GeneratedValues<P>, chunkOnkey?: keyof P) : ComponentVariants<P> {
  const keys = Object.keys(generatedValues) as (keyof P)[];
  const chunkKey = chunkOnkey ?? keys[0];
  let variants : P[] = [initialProps];
  for (const key of keys) {
    const values = generatedValues[key]!;
    if (values.length === 0) continue;
    if (key === chunkKey) continue;

    variants = vary(variants, key, values);
  }
  if (keys.length > 0) {
    const values = generatedValues[chunkKey]!;
    return {
      count: variants.length * values.length,
      chunks: variants.map(variant => 
        toChunk(vary([variant], chunkKey, values), keys, chunkKey))
    }
  } else {
    return {
      count: variants.length,
      chunks: [toChunk(variants, keys)]
    }
  }
}

function vary<P>(variants: P[], key: keyof P, keyVariants: P[keyof P][]) : P[] {
  return keyVariants.flatMap((value : P[typeof key]) =>
    variants.map(variant => ({...variant, [key]: value}))
  )
}

function toChunk<P>(variants: P[], generatedKeys: (keyof P)[], chunkKey?: keyof P) {
  return {
    props: pick(variants[0], generatedKeys.filter(key => key !== chunkKey)),
    changingProperty: chunkKey ? {
      name: chunkKey,
      values: variants.map((v: P) => v[chunkKey]),
    } : undefined,
    variants,
  }
}

function pick<P>(p: P, keys: (keyof P)[]): Partial<P> {
  const picked : Partial<P> = {};
  keys.forEach(key => picked[key] = p[key]);
  return picked;
}
