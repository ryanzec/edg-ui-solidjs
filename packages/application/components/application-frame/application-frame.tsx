import { useLocation, useNavigate } from '@solidjs/router';
import { type JSX, mergeProps, Show } from 'solid-js';
import CompanyLogo from '$/application/assets/svgs/company-logo.svg?raw';
import CompanyLogoSmall from '$/application/assets/svgs/company-logo-small.svg?raw';
import { type ApplicationFeature, UiRouteName } from '$/application/utils/application';
import Icon, { IconColor, IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading';
import ScrollArea from '$/core/components/scroll-area';
import type { TooltipComponentRef } from '$/core/components/tooltip';
import { componentRefUtils } from '$/core/stores/component-ref';
import { sizerStoreUtils } from '$/core/stores/sizer.store';
import { themeManagerStore } from '$/core/stores/theme-manager.store';
import { toggleStoreUtils } from '$/core/stores/toggle.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { routeUtils } from '$/core/utils/route';
import { tailwindUtils } from '$/core/utils/tailwind';
import UserMenu from '../user-menu/user-menu';

export type ApplicationFrameTopNavigationItem = {
  label: string;
  route: string;
  isActive: boolean;
};

export type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    isInitializing: boolean;
    isAuthenticated: boolean;
    user?: {
      name: string;
      email: string;
    };
    features?: ApplicationFeature[];
  };

const defaultProps: Required<Pick<ApplicationFrameProps, 'features'>> = {
  features: [],
};

const ApplicationFrame = (passedProps: ApplicationFrameProps) => {
  const props = mergeProps(defaultProps, passedProps);
  const navigate = useNavigate();
  const location = useLocation();

  const sizerStore = sizerStoreUtils.createStore({
    resizeFromSide: 'right',
    syncSizeWithMovement: false,
    onSizeChanged: (startSize, _newSize, moveDifference) => {
      const initialToggleState = startSize > 60;

      if (moveDifference >= 50) {
        sidebarOpenedToggleStore.setIsToggled(true);

        return;
      }

      if (moveDifference <= -50) {
        sidebarOpenedToggleStore.setIsToggled(false);

        return;
      }

      sidebarOpenedToggleStore.setIsToggled(initialToggleState);
    },
  });
  const userDropDownComponentRef = componentRefUtils.createRef<TooltipComponentRef>();
  const sidebarOpenedToggleStore = toggleStoreUtils.createStore({
    defaultIsToggled: true,
  });

  const handleHome = () => {
    navigate(UiRouteName.HOME);
  };

  const setSidebarElementRef = (element: HTMLDivElement) => {
    sizerStore.setElementRef(element);
    sizerStore.setupResizeEvents();
  };

  return (
    <>
      <div
        data-id="application-frame"
        data-theme={themeManagerStore.theme()}
        class="flex h-full w-full bg-brand-subtle1"
      >
        <Show when={props.isInitializing === false} fallback={<Loading.Section>Loading...</Loading.Section>}>
          <Show when={props.isAuthenticated}>
            <div
              ref={setSidebarElementRef}
              data-id="sidebar"
              class={tailwindUtils.merge(
                'flex flex-col h-full bg-brand-subtle3 gap-2xs relative transition-shadow duration-150 ease-in-out delay-100',
                {
                  'w-[250px]': sidebarOpenedToggleStore.isToggled(),
                  'w-[60px]': sidebarOpenedToggleStore.isToggled() === false,
                  'shadow-[inset_-4px_0_0_0_var(--color-brand-subtle4)]': sizerStore.isInResizeArea(),
                },
              )}
            >
              <Show
                when={sidebarOpenedToggleStore.isToggled()}
                fallback={<div class="self-center max-w-full p-3xs w-[40px] h-[40px]" innerHTML={CompanyLogoSmall} />}
              >
                <div class="self-center max-w-full p-3xs" innerHTML={CompanyLogo} />
              </Show>
              <nav data-id="navigation">
                <div class="flex flex-col gap-2xs">
                  <button
                    class={tailwindUtils.merge(
                      'flex gap-3xs items-center rounded-full mx-xs px-2xs py-4xs hover:bg-brand-subtle4 cursor-pointer',
                      {
                        'bg-[#a8bfb6]': routeUtils.isActive(UiRouteName.HOME, location.pathname),
                      },
                    )}
                    type="button"
                    onClick={handleHome}
                  >
                    <Icon
                      icon="house"
                      color={IconColor.INHERIT}
                      size={sidebarOpenedToggleStore.isToggled() ? IconSize.LARGE : IconSize.EXTRA_LARGE}
                    />
                    <Show when={sidebarOpenedToggleStore.isToggled()}>Home</Show>
                  </button>
                </div>
              </nav>
              <div class="mt-auto">
                <Show when={props.user}>
                  {(user) => (
                    <UserMenu
                      userMenuTooltipComponentRef={userDropDownComponentRef}
                      user={user()}
                      features={props.features}
                      isCollapsed={sidebarOpenedToggleStore.isToggled() === false}
                      showName={sidebarOpenedToggleStore.isToggled()}
                    />
                  )}
                </Show>
              </div>
            </div>
          </Show>
          <div class="h-full min-h-[1px] flex-1">
            <ScrollArea>
              <div class="m-base h-[calc(100%-(var(--spacing-base)*2))] w-[calc(100%-(var(--spacing-base)*2))] flex">
                {props.children}
              </div>
            </ScrollArea>
          </div>
        </Show>
      </div>
    </>
  );
};

export default ApplicationFrame;
