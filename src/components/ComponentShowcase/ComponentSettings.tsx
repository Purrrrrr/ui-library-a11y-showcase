import React from 'react';
import {FieldsDef, FieldDef} from './types';

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

