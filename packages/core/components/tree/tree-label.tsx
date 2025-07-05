import { type JSX, splitProps, useContext } from 'solid-js';

import EllipsisText from '$/core/components/ellipsis-text';
import Icon, { type IconName } from '$/core/components/icon';
import { TreeContext, TreeSize } from '$/core/components/tree/tree';
import { tailwindUtils } from '$/core/utils/tailwind';

export type TreeLabelProps = JSX.HTMLAttributes<HTMLDivElement> & {
  label: string;
  icon?: IconName;
  isActive?: boolean;
};

const TreeLabel = (passedProps: TreeLabelProps) => {
  const [props, restOfProps] = splitProps(passedProps, ['class', 'label', 'icon', 'isActive']);

  const context = useContext(TreeContext);

  return (
    <div {...restOfProps} class={tailwindUtils.merge('flex items-center gap-4xs py-1xs', props.class)}>
      <Icon icon={props.icon || 'floppy-disk'} />
      <span
        class={tailwindUtils.merge('text-sm min-w-[1px]  inline-flex', {
          'text-base': context?.size === TreeSize.DEFAULT,
          'text-sm': context?.size === TreeSize.SMALL,
          'text-bold': props.isActive,
        })}
      >
        <EllipsisText.Tooltip class="line-clamp-1" text={props.label} tooltipContentElement={props.label} />
      </span>
    </div>
  );
};

export default TreeLabel;
