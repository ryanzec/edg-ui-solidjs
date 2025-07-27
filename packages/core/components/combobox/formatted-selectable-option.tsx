import { Match, Switch } from 'solid-js';
import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/core/components/combobox/utils';
import Icon, { IconColor } from '$/core/components/icon';
import iconStyles from '$/core/components/icon/icon.module.css';
import List from '$/core/components/list';
import { tailwindUtils } from '$/core/utils/tailwind';

const FormattedSelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id="selectable-option"
      data-combobox-value={props.option.value}
      class={tailwindUtils.merge(styles.selectableOption, styles.listOption)}
      onMouseEnter={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      <Switch
        fallback={<Icon class={tailwindUtils.merge(styles.invisible, iconStyles.spacingRight)} icon="question-mark" />}
      >
        <Match when={props.isFocusedOption(props.optionIndex) && props.isSelectedOption(props.option.value)}>
          <Icon class={tailwindUtils.merge(iconStyles.spacingRight)} color={IconColor.DANGER} icon="x" />
        </Match>
        <Match when={props.isSelectedOption(props.option.value)}>
          <Icon class={tailwindUtils.merge(iconStyles.spacingRight)} color={IconColor.SUCCESS} icon="check" />
        </Match>
        <Match when={props.isFocusedOption(props.optionIndex)}>
          <Icon class={tailwindUtils.merge(iconStyles.spacingRight)} color={IconColor.SUCCESS} icon="plus" />
        </Match>
      </Switch>
      {props.option.label}
    </List.Item>
  );
};

export default FormattedSelectableOption;
