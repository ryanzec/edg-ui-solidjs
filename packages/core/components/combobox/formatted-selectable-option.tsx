import classnames from 'classnames';
import { Match, Switch } from 'solid-js';

import styles from '$/core/components/combobox/combobox.module.css';
import type { ComboboxExtraData, ComboboxSelectableOptionProps } from '$/core/components/combobox/utils';
import Icon from '$/core/components/icon';
import iconStyles from '$/core/components/icon/icon.module.css';
import List from '$/core/components/list';

const FormattedSelectableOption = <TData extends ComboboxExtraData>(props: ComboboxSelectableOptionProps<TData>) => {
  return (
    <List.Item
      data-id="selectable-option"
      data-combobox-value={props.option.value}
      class={classnames(styles.selectableOption, styles.listOption)}
      onMouseEnter={() => props.onMouseEnterOption(props.optionIndex)}
      onMouseDown={() => props.onMouseDownOption(props.option)}
      tabIndex={-1}
    >
      <Switch fallback={<Icon class={classnames(styles.invisible, iconStyles.spacingRight)} icon="question" />}>
        <Match when={props.isFocusedOption(props.optionIndex) && props.isSelectedOption(props.option.value)}>
          <Icon class={classnames(styles.removeIcon, iconStyles.spacingRight)} icon="x" />
        </Match>
        <Match when={props.isSelectedOption(props.option.value)}>
          <Icon class={classnames(styles.addIcon, iconStyles.spacingRight)} icon="check" />
        </Match>
        <Match when={props.isFocusedOption(props.optionIndex)}>
          <Icon class={classnames(styles.addIcon, iconStyles.spacingRight)} icon="plus" />
        </Match>
      </Switch>
      {props.option.label}
    </List.Item>
  );
};

export default FormattedSelectableOption;
