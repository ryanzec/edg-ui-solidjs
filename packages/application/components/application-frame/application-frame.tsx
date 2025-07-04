import CompanyLogo from '$/application/assets/svgs/company-logo.svg?raw';
import type { ApplicationFeature } from '$/application/utils/application';
import Icon, { IconColor, IconSize } from '$/core/components/icon';
import Loading from '$/core/components/loading';
import ScrollArea from '$/core/components/scroll-area';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import { themeManagerStore } from '$/core/stores/theme-manager.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import { tailwindUtils } from '$/core/utils/tailwind';
import type { Navigator } from '@solidjs/router';
import { For, type JSX, Show, mergeProps } from 'solid-js';
import UserMenu from '../user-drop-down/user-drop-down';

export type ApplicationFrameTopNavigationItem = {
  label: string;
  route: string;
  isActive: boolean;
};

export type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    homeRoute: string;
    topNavigationItems: ApplicationFrameTopNavigationItem[];
    isInitializing: boolean;
    isAuthenticated: boolean;
    navigate: Navigator;
    user?: {
      name: string;
      email: string;
    };
    onSettings: () => void;
    onInternalTools: () => void;
    onLogout: () => void;
    features?: ApplicationFeature[];
  };

const defaultProps: Required<Pick<ApplicationFrameProps, 'features'>> = {
  features: [],
};

const ApplicationFrame = (passedProps: ApplicationFrameProps) => {
  const props = mergeProps(defaultProps, passedProps);

  const userDropDownStore = tooltipComponentUtils.createStore();

  return (
    <>
      <div data-id="application-frame" data-theme={themeManagerStore.theme()} class="flex h-full w-full">
        <Show when={props.isInitializing === false} fallback={<Loading.Section>Loading...</Loading.Section>}>
          <Show when={props.isAuthenticated}>
            <div class="flex flex-col h-full w-[250px] bg-[#d1ddd8] gap-2xs">
              {/* @todo add application logo */}
              <span class="self-center max-w-full p-3xs" innerHTML={CompanyLogo} />
              <nav data-id="navigation">
                <div class="flex flex-col gap-2xs">
                  <For each={props.topNavigationItems}>
                    {(item) => (
                      <button
                        class={tailwindUtils.merge(
                          'flex gap-3xs items-center rounded-full mx-xs px-2xs py-4xs hover:bg-[#a8bfb6] cursor-pointer',
                          {
                            'bg-[#a8bfb6]': item.isActive,
                          },
                        )}
                        type="button"
                        onClick={() => props.navigate(item.route)}
                      >
                        <Icon icon="house" color={IconColor.INHERIT} size={IconSize.LARGE} />
                        {item.label}
                      </button>
                    )}
                  </For>
                </div>
              </nav>
              <div class="mt-auto">
                <Show when={props.user}>
                  {(user) => (
                    <UserMenu
                      tooltipStore={userDropDownStore}
                      user={user()}
                      onLogout={props.onLogout}
                      features={props.features}
                      onSettings={props.onSettings}
                      onInternalTools={props.onInternalTools}
                    />
                  )}
                </Show>
              </div>
            </div>
          </Show>
          <div class="p-sm h-full min-h-[1px]">
            <ScrollArea>
              <div class="h-full w-full flex items-center justify-center">{props.children}</div>
            </ScrollArea>
          </div>
        </Show>
      </div>
    </>
  );
};

export default ApplicationFrame;
