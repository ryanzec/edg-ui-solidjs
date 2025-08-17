import { type JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Dynamic, type DynamicProps } from 'solid-js/web';
import styles from '$/core/components/card/card.module.css';
import Icon from '$/core/components/icon';
import { tailwindUtils } from '$/core/utils/tailwind';

export type CardProps = Omit<DynamicProps<'button' | 'div', JSX.HTMLAttributes<HTMLDivElement>>, 'component'> & {
  link?: string;
  linkIsExternal?: boolean;
  asPageSection?: boolean;
  onClose?: () => void;
  onClick?: (event: MouseEvent) => void;
};

const defaultProps: CardProps = {
  linkIsExternal: false,
  asPageSection: false,
};

const Card = (passedProps: CardProps) => {
  const [props, restOfProps] = splitProps(mergeProps(defaultProps, passedProps), [
    'children',
    'class',
    'link',
    'linkIsExternal',
    'onClose',
    'asPageSection',
    'onClick',
  ]);

  const extraProps = () => {
    const extraProps: Record<string, unknown> = {};

    if (props.linkIsExternal) {
      extraProps.rel = 'noreferrer';
      extraProps.target = '_blank';
    }

    if (props.link) {
      extraProps.href = props.link;
    }

    if (props.onClick) {
      extraProps.onClick = props.onClick;
    }

    return extraProps;
  };

  const elementType = () => {
    if (props.link) {
      return 'a';
    }

    return props.onClick ? 'button' : 'div';
  };

  const clickableIconCssClass = 'absolute right-sm top-sm cursor-pointer';

  return (
    <Dynamic
      data-id="card"
      component={elementType()}
      {...restOfProps}
      {...extraProps()}
      class={tailwindUtils.merge(styles.card, props.class, {
        [styles.asPageSection]: props.asPageSection,
        [styles.clickable]: props.onClick || props.link,
      })}
    >
      <Show when={props.onClose}>
        <button type="button" class={clickableIconCssClass} onClick={props.onClose}>
          <Icon icon="x" />
        </button>
      </Show>
      {props.children}
    </Dynamic>
  );
};

export default Card;
