import React, {useState, useEffect, useMemo, ComponentType, ChangeEvent} from 'react';

type ChangeCallbackGetter<Props, ValueKey extends keyof Props> = (setValue: (val : Props[ValueKey]) => void) => Partial<Props>;
interface DefaultInputProps {
  value?: any,
  onChange?: (e: ChangeEvent<any>) => void
}

export function controlInputValue<Props extends DefaultInputProps>(input: ComponentType<Props>) : ComponentType<Props>{
  return controlInputValueWithOverrides<Props, 'value'>('value', setValue => ({onChange: (e : ChangeEvent<any>) => setValue(e.target.value)} as Partial<Props>), input);
};

export function controlInputValueWithHandlers<Props extends DefaultInputProps>(getChangeCallbacks : ChangeCallbackGetter<Props, 'value'>, input: ComponentType<Props>) : ComponentType<Props>{
  return controlInputValueWithOverrides<Props, 'value'>('value', getChangeCallbacks, input);
};

export function controlInputValueWithOverrides<Props, ValueKey extends keyof Props>(
  valueProp: ValueKey,
  getChangeCallbacks: ChangeCallbackGetter<Props, ValueKey>,
  Input: ComponentType<Props>
) : ComponentType<Props> {
  return (props: Props) => {
    const initialValue = props[valueProp]
    const [value, setValue] = useState<Props[ValueKey]>(initialValue);
    useEffect(
      () => setValue(initialValue),
      [initialValue]
    );
    const changeCallbacks = useMemo(() => getChangeCallbacks(setValue), [setValue]);

    const inputProps : Props = {
      ...props,
      ...changeCallbacks,
      [valueProp]: value,
    };
    return <Input {...inputProps} />;
  }
}
