import { useNavigate } from '@solidjs/router';
import { createSignal, type JSX, mergeProps, Show } from 'solid-js';
import CompanyLogo from '$/application/assets/svgs/company-logo.svg?raw';
import CompanyLogoSmall from '$/application/assets/svgs/company-logo-small.svg?raw';
import ApplicationFrameSecondaryMenu from '$/application/components/application-frame/application-frame-secondary-menu';
import ApplicationFrameSectionHeader from '$/application/components/application-frame/application-frame-section-header';
import ApplicationFrameSeparator from '$/application/components/application-frame/application-frame-separator';
import ApplicationFrameTopItem from '$/application/components/application-frame/application-frame-top-item';
import ApplicationFrameUserMenu from '$/application/components/application-frame/application-frame-user-menu';
import {
  type ApplicationFrameContext,
  ApplicationFrameContextComponent,
} from '$/application/components/application-frame/utils';
import { type ApplicationFeature, UiRouteName } from '$/application/utils/application';
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

export type ApplicationFrameTopNavigationItem = {
  label: string;
  route: string;
  isActive: boolean;
};

export type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    isInitializing: boolean;
    isAuthenticated: boolean;
    pathname: string;
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

  const [forceFullHeight, setForceFullHeight] = createSignal<boolean>(false);

  const sidebarToggleStore = toggleStoreUtils.createStore({
    defaultIsToggled: true,
  });
  const sizerStore = sizerStoreUtils.createStore({
    resizeFromSide: 'right',
    syncSizeWithMovement: false,
    onSizeChanged: (startSize, _newSize, moveDifference) => {
      const initialToggleState = startSize > 60;

      if (moveDifference >= 50) {
        sidebarToggleStore.setIsToggled(true);

        return;
      }

      if (moveDifference <= -50) {
        sidebarToggleStore.setIsToggled(false);

        return;
      }

      sidebarToggleStore.setIsToggled(initialToggleState);
    },
  });
  const userDropDownComponentRef = componentRefUtils.createRef<TooltipComponentRef>();
  const secondaryMenuDropDownComponentRef = componentRefUtils.createRef<TooltipComponentRef>();

  const handleHome = () => {
    navigate(UiRouteName.DASHBOARD);
  };

  const setSidebarElementRef = (element: HTMLDivElement) => {
    sizerStore.setElementRef(element);
    sizerStore.setupResizeEvents();
  };

  const applicationFrameContext: ApplicationFrameContext = {
    sidebarToggleStore,
    forceFullHeight,
    setForceFullHeight,
  };

  return (
    <ApplicationFrameContextComponent.Provider value={applicationFrameContext}>
      <div
        data-id="application-frame"
        data-theme={themeManagerStore.theme()}
        class="flex h-full w-full bg-surface-pure"
      >
        <Show when={props.isInitializing === false} fallback={<Loading.Section>Loading...</Loading.Section>}>
          <Show when={props.isAuthenticated}>
            <div
              ref={setSidebarElementRef}
              data-id="sidebar"
              class={tailwindUtils.merge(
                'flex flex-col h-full bg-brand-weak gap-2xs relative transition-shadow duration-150 ease-in-out delay-100',
                {
                  'w-[220px]': sidebarToggleStore.isToggled(),
                  'w-[48px]': sidebarToggleStore.isToggled() === false,
                  'shadow-[inset_-4px_0_0_0_var(--color-warning-high-weak1)]': sizerStore.isInResizeArea(),
                },
              )}
            >
              <Show
                when={sidebarToggleStore.isToggled()}
                fallback={
                  <div
                    class="self-center max-w-full p-application-sidebar w-[40px] h-[40px]"
                    innerHTML={CompanyLogoSmall}
                  />
                }
              >
                <div class="self-center max-w-full p-application-sidebar" innerHTML={CompanyLogo} />
              </Show>
              <nav data-id="navigation" class="flex flex-col gap-4xs">
                <ApplicationFrameTopItem
                  label="Dashboard"
                  icon="gauge"
                  isActive={routeUtils.isActive(UiRouteName.DASHBOARD, props.pathname)}
                  onClick={handleHome}
                />
                <ApplicationFrameSectionHeader>Tracking</ApplicationFrameSectionHeader>
                <ApplicationFrameTopItem
                  label="Projects"
                  icon="rocket"
                  isActive={routeUtils.isActive(UiRouteName.PROJECTS, props.pathname)}
                  onClick={handleHome}
                />
                <ApplicationFrameTopItem
                  label="Epics"
                  icon="lightning"
                  isActive={routeUtils.isActive(UiRouteName.EPICS, props.pathname)}
                  onClick={handleHome}
                />
                <ApplicationFrameTopItem
                  label="Tickets"
                  icon="kanban"
                  isActive={routeUtils.isActive(UiRouteName.TICKETS, props.pathname)}
                  onClick={handleHome}
                />
                <ApplicationFrameSectionHeader>Planning</ApplicationFrameSectionHeader>
                <ApplicationFrameTopItem
                  label="Roadmap"
                  icon="road-horizon"
                  isActive={routeUtils.isActive(UiRouteName.ROADMAP, props.pathname)}
                  onClick={handleHome}
                />
              </nav>
              <div class="flex flex-col gap-2xs mt-auto">
                <ApplicationFrameSeparator />
                <ApplicationFrameTopItem
                  label="Lower Menu Item"
                  icon="puzzle-piece"
                  isActive={routeUtils.isActive(UiRouteName.ROADMAP, props.pathname)}
                  onClick={handleHome}
                />
                <ApplicationFrameSecondaryMenu tooltipComponentRef={secondaryMenuDropDownComponentRef} />
                <Show when={props.user}>
                  {(user) => (
                    <ApplicationFrameUserMenu
                      tooltipComponentRef={userDropDownComponentRef}
                      user={user()}
                      features={props.features}
                      isCollapsed={sidebarToggleStore.isToggled() === false}
                      showName={sidebarToggleStore.isToggled()}
                    />
                  )}
                </Show>
              </div>
            </div>
          </Show>
          <div class="h-full min-h-[1px] flex-1">
            <ScrollArea class="p-base">
              <div
                class={tailwindUtils.merge('flex flex-col min-h-full min-w-full', {
                  'max-h-full': forceFullHeight(),
                })}
              >
                {props.children}
              </div>
            </ScrollArea>
          </div>
        </Show>
      </div>
    </ApplicationFrameContextComponent.Provider>
  );
};

export default ApplicationFrame;
