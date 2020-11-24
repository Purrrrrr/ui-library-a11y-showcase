import React, {useState} from 'react';
import {BooleanInput} from './fields';
import {ShowcaseWithProps, FieldsDef, FieldDef} from './types';
import {generateVariants, GeneratedValues} from './utils/generateVariants';


export function useComponentSettings<A,P>(showcase : ShowcaseWithProps<A, P>) {
  const {defaults, fields, id} = showcase;
  const [props, setProps] = useState<P>({...defaults ?? {}, ...getDefaultProps(fields)})
  const [showAllVariants, setShowAllVariants] = useState(true);
  let variants = null;
  if (showAllVariants) {
    const generatedValues = getGeneratedValues(fields);
    variants = generateVariants(props, generatedValues);
  }

  return {
    props,
    generatedValues: showAllVariants ? getGeneratedValues(fields) : undefined,
    variants,
    Settings: () => <>
      <BooleanInput id={id+"-show-all-variants"} label="Generate variants automatically"
        value={showAllVariants} onChange={setShowAllVariants} data={undefined}/>
      <ComponentSettings id={id} props={props} setProps={setProps}
        fields={fields} fieldFilter={showAllVariants ? field => !field.valueGenerator : undefined}/>
    </>
  }
}


interface ComponentSettingsProps<P> {
  id: string
  props: P
  setProps: (p: P) => void
  fields: FieldsDef<P>
  fieldFilter?: (f: FieldDef<any>) => boolean
}

export function ComponentSettings<P>({id, props, setProps, fields, fieldFilter} : ComponentSettingsProps<P>) {
  const keys = Object.keys(fields) as [keyof P];
  return <>
    {keys.map(key => {
      const fieldDef = fields[key];
      if (fieldFilter && !fieldFilter(fieldDef)) return null;
      const Field = fieldDef.fieldComponent;
      return <Field id={id+"-"+key} key={String(key)} data={fieldDef.data} label={String(key)}
        value={props[key]} onChange={(value) => setProps({...props, [key]: value})} />
    })}
  </>
}


function getDefaultProps<P>(propDefs : FieldsDef<P>) : P {
  let props : Partial<P> = {}
  const keys = Object.keys(propDefs) as [keyof P];
  for (const key of keys) {
    props[key] = propDefs[key].default;
  }
  return props as P;
}

function getGeneratedValues<P>(fields: FieldsDef<P>) : GeneratedValues<P> {
  const generatedValues = {} as GeneratedValues<P>;
  const fieldDefs = Object.entries(fields) as [[keyof P, FieldDef<P[keyof P], any> ]];
  for (const [key, field] of fieldDefs) {
    if (!field.valueGenerator) continue;
    generatedValues[key] = field.valueGenerator();
  }
  return generatedValues;
}
