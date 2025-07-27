import { type JSX, Show } from 'solid-js';
import styles from '$/core/components/form-array/form-array.module.css';
import Icon, { IconColor } from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';

export type FormArrayItemProps = {
  encloseItem?: boolean;
  children: JSX.Element;
  onDelete?: () => void;
};

const FormArrayItem = (props: FormArrayItemProps) => {
  return (
    <div
      class={tailwindUtils.merge(styles.itemContainer, {
        [styles.itemEnclosed]: props.encloseItem,
      })}
    >
      <Show when={props.onDelete}>
        <Icon class={styles.itemDeleteTrigger} icon="trash" color={IconColor.DANGER} onClick={props.onDelete} />
      </Show>
      {props.children}
    </div>
  );
};

export default FormArrayItem;
