import { Show, useContext } from 'solid-js';
import { ApplicationFrameContextComponent } from '$/application/components/application-frame/utils';
import Icon, { IconColor, type IconName, IconSize } from '$/core/components/icon';
import Tooltip, { type TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { loggerUtils } from '$/core/utils/logger';
import { tailwindUtils } from '$/core/utils/tailwind';

export type ApplicationFrameTopItemProps = {
  label: string;
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
  isMenu?: boolean;
};

const ApplicationFrameTopItem = (props: ApplicationFrameTopItemProps) => {
  const tooltipComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  const applicationFrameContext = useContext(ApplicationFrameContextComponent);

  if (!applicationFrameContext) {
    loggerUtils.error({
      type: 'application-frame-context-not-found',
    });

    return null;
  }

  return (
    <div
      data-id="application-frame-top-item"
      class={tailwindUtils.merge('flex flex-col gap-2xs', {
        'w-full': props.isMenu,
      })}
    >
      <Tooltip
        class={tailwindUtils.merge(
          'flex gap-3xs items-center rounded-sm mx-application-sidebar px-2xs py-4xs hover:bg-brand-weak1 cursor-pointer',
          {
            'bg-brand-weak1': props.isActive,
          },
        )}
        triggerEvent="hover"
        tooltipComponentRef={tooltipComponentRef}
        placement="right"
      >
        <Tooltip.Handle
          class="w-full"
          data-id="handle"
          data-tooltip-enabled={applicationFrameContext.sidebarToggleStore.isToggled() === false}
        >
          <button
            class={tailwindUtils.merge('flex w-full gap-3xs items-center rounded-sm cursor-pointer', {
              'bg-brand-weak1': props.isActive,
            })}
            type="button"
            onClick={props.onClick}
          >
            <Icon
              icon={props.icon}
              color={IconColor.INHERIT}
              size={applicationFrameContext.sidebarToggleStore.isToggled() ? IconSize.LARGE : IconSize.EXTRA_LARGE}
            />
            <Show when={applicationFrameContext.sidebarToggleStore.isToggled()}>{props.label}</Show>
            <Show when={props.isMenu && applicationFrameContext.sidebarToggleStore.isToggled()}>
              <Icon class="ml-auto" icon="caret-right" color={IconColor.INHERIT} />
            </Show>
          </button>
        </Tooltip.Handle>
        <Tooltip.Content>{props.label}</Tooltip.Content>
      </Tooltip>
    </div>
  );
};

export default ApplicationFrameTopItem;
