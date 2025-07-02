import Badge, { BadgeColor, BadgeVariant } from '$/core/components/badge';
import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectedOptionProps } from '$/core/components/combobox/utils';
import Icon from '$/core/components/icon';

const SelectedOption = <TData extends ComboboxExtraData>(props: ComboboxSelectedOptionProps<TData>) => {
  return (
    <Badge
      data-id="selected-option"
      class={styles.selectedOption}
      variant={BadgeVariant.WEAK}
      color={BadgeColor.NEUTRAL}
    >
      {props.option.label}
      <Icon
        data-id="delete-indicator"
        icon="x"
        class={styles.removeSelectedOption}
        onClick={() => {
          props.removeValue(props.optionIndex);
        }}
      />
    </Badge>
  );
};

export default SelectedOption;
