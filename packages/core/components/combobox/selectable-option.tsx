import { tailwindUtils } from '$/core/utils/tailwind';

import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/core/components/combobox/utils';
import List from '$/core/components/list';

const SelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id="selectable-option"
      data-combobox-value={props.option.value}
      class={tailwindUtils.merge(styles.selectableOption, styles.listOption)}
      onMouseMove={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      {props.option.label}
    </List.Item>
  );
};

export default SelectableOption;
