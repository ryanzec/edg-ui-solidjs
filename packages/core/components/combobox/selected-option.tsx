import Badge, { BadgeColor, BadgeVariant } from '$/core/components/badge';
import Button, { ButtonColor, ButtonSize, ButtonVariant } from '$/core/components/button';
import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectedOptionProps } from '$/core/components/combobox/utils';

const SelectedOption = <TData extends ComboboxExtraData>(props: ComboboxSelectedOptionProps<TData>) => {
  return (
    <Badge
      data-id="selected-option"
      class={styles.selectedOption}
      variant={BadgeVariant.WEAK}
      color={BadgeColor.NEUTRAL}
    >
      {props.option.label}
      <Button
        data-id="delete-indicator"
        class={styles.removeSelectedOption}
        onClick={() => {
          props.removeValue(props.optionIndex);
        }}
        variant={ButtonVariant.GHOST}
        color={ButtonColor.NEUTRAL}
        size={ButtonSize.SMALL}
        icon="x"
      />
    </Badge>
  );
};

export default SelectedOption;
