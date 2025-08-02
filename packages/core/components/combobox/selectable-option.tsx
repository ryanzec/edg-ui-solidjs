import { createMemo } from 'solid-js';
import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/core/components/combobox/utils';
import List from '$/core/components/list';
import { tailwindUtils } from '$/core/utils/tailwind';

const SelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  const extraProps = createMemo(() => {
    if (props.option.disabled) {
      return {};
    }

    return {
      'data-combobox-value': props.option.value,
    };
  });

  return (
    <List.Item
      data-id="selectable-option"
      {...extraProps()}
      class={tailwindUtils.merge(styles.selectableOption, styles.listOption)}
      onMouseEnter={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
      isClickable
      disabled={props.option.disabled}
    >
      {props.option.label}
    </List.Item>
  );
};

export default SelectableOption;
