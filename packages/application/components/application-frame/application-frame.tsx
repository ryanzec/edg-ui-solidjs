import CompanyLogo from '$/application/assets/svgs/company-logo.svg?raw';
import { type ApplicationFeature, UiRouteName } from '$/application/utils/application';
import Icon, { IconColor, IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading';
import ScrollArea from '$/core/components/scroll-area';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import { themeManagerStore } from '$/core/stores/theme-manager.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { routeUtils } from '$/core/utils/route';
import { tailwindUtils } from '$/core/utils/tailwind';
import { useLocation, useNavigate } from '@solidjs/router';
import { type JSX, Show, mergeProps } from 'solid-js';
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

  const userDropDownStore = tooltipComponentUtils.createStore();

  const handleHome = () => {
    navigate(UiRouteName.HOME);
  };

  return (
    <>
      <div data-id="application-frame" data-theme={themeManagerStore.theme()} class="flex h-[100vh] w-[100vw]">
        <Show when={props.isInitializing === false} fallback={<Loading.Section>Loading...</Loading.Section>}>
          <Show when={props.isAuthenticated}>
            <div class="flex flex-col h-full w-[250px] bg-[#d1ddd8] gap-2xs">
              {/* @todo add application logo */}
              <span class="self-center max-w-full p-3xs" innerHTML={CompanyLogo} />
              <nav data-id="navigation">
                <div class="flex flex-col gap-2xs">
                  <button
                    class={tailwindUtils.merge(
                      'flex gap-3xs items-center rounded-full mx-xs px-2xs py-4xs hover:bg-[#a8bfb6] cursor-pointer',
                      {
                        'bg-[#a8bfb6]': routeUtils.isActive(UiRouteName.HOME, location.pathname),
                      },
                    )}
                    type="button"
                    onClick={handleHome}
                  >
                    <Icon icon="house" color={IconColor.INHERIT} size={IconSize.LARGE} />
                    Home
                  </button>
                </div>
              </nav>
              <div class="mt-auto">
                <Show when={props.user}>
                  {(user) => <UserMenu tooltipStore={userDropDownStore} user={user()} features={props.features} />}
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
