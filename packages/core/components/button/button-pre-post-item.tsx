import { type JSX, mergeProps, splitProps } from 'solid-js';
import styles from '$/core/components/button/button.module.css';
import { ButtonItemPosition } from '$/core/components/button/utils';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ButtonIconProps = JSX.HTMLAttributes<HTMLDivElement> & {
  position?: ButtonItemPosition;
  itemElement: JSX.Element;
};

const ButtonPrePostItem = (passedProps: ButtonIconProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps({ position: ButtonItemPosition.PRE, isLoading: false, isIconOnly: false }, passedProps),
    ['position', 'itemElement', 'class'],
  );

  return (
    <div
      data-id={`${props.position}-icon`}
      {...restOfProps}
      class={tailwindUtils.merge(styles.prePostItem, props.class, {
        [styles.preItem]: props.position === ButtonItemPosition.PRE,
        [styles.postItem]: props.position === ButtonItemPosition.POST,
      })}
    >
      {props.itemElement}
    </div>
  );
};

export default ButtonPrePostItem;
