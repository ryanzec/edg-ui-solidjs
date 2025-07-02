import styles from '$/core/components/form-array/form-array.module.css';
import Icon, { IconColor } from '$/core/components/icon';
import classnames from 'classnames';
import { type JSX, Show } from 'solid-js';

export type FormArrayItemProps = {
  encloseItem?: boolean;
  children: JSX.Element;
  onDelete?: () => void;
};

const FormArrayItem = (props: FormArrayItemProps) => {
  return (
    <div
      class={classnames(styles.itemContainer, {
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
