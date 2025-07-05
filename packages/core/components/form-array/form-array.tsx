import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import styles from '$/core/components/form-array/form-array.module.css';
import Icon from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';
import { type JSX, Show } from 'solid-js';

export type FormArrayProps = {
  onAdd: () => void;
  addLabel: string;
  children: JSX.Element;
  wrapItems?: boolean;
  hideAddButton?: boolean;
  class?: string;
};

const FormArray = (props: FormArrayProps) => {
  return (
    <div data-id="form-array-container" class={tailwindUtils.merge(styles.container, props.class)}>
      {props.children}
      <Show when={!props.hideAddButton}>
        <Button
          data-id="add-array-field-button"
          type="button"
          class={styles.addTrigger}
          variant={ButtonVariant.GHOST}
          color={ButtonColor.INFO}
          onclick={props.onAdd}
          preElement={<Icon icon="plus-circle" />}
        >
          {props.addLabel}
        </Button>
      </Show>
    </div>
  );
};

export default FormArray;
