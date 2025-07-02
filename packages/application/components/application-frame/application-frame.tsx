import { For, type JSX, Show } from 'solid-js';

import styles from '$/application/components/application-frame/application-frame.module.css';
import { Avatar } from '$/core/components/avatar';
import DropDown from '$/core/components/drop-down';
import List from '$/core/components/list';
import Loading from '$/core/components/loading';
import ScrollArea from '$/core/components/scroll-area';
import Tabs from '$/core/components/tabs';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import { themeManagerStore } from '$/core/stores/theme-manager.store';
import type { CommonDataAttributes } from '$/core/types/generic';
import type { Navigator } from '@solidjs/router';

export type ApplicationFrameTopNavigationItem = {
  label: string;
  route: string;
  isActive: boolean;
};

export type ApplicationFrameUserItems = {
  label: string;
  onClick: () => void;
};

export type ApplicationFrameProps = JSX.HTMLAttributes<HTMLDivElement> &
  CommonDataAttributes & {
    homeRoute: string;
    topNavigationItems: ApplicationFrameTopNavigationItem[];
    userItems: ApplicationFrameUserItems[];
    isInitializing: boolean;
    isAuthenticated: boolean;
    navigate: Navigator;
    user?: {
      name: string;
      email: string;
    };
    onOrganizationSelected?: (organizationId: string) => void;
  };

const ApplicationFrame = (props: ApplicationFrameProps) => {
  const userDropDownStore = tooltipComponentUtils.createStore();

  const handleUserItemClick = (item: ApplicationFrameUserItems) => {
    item.onClick();

    userDropDownStore.hide();
  };

  return (
    <>
      <div data-id="application-frame" data-theme={themeManagerStore.theme()} class={styles.applicationFrame}>
        <Show when={props.isInitializing === false} fallback={<Loading.Section>Loading...</Loading.Section>}>
          <Show when={props.isAuthenticated}>
            <div class={styles.applicationNavigationContainer}>
              {/* @todo add application logo */}
              <span innerHTML="Application Logo" />
              <nav data-id="navigation" class={styles.applicationNavigation}>
                <Tabs class={styles.tabs} onInverse>
                  <For each={props.topNavigationItems}>
                    {(item) => (
                      <Tabs.Tab isActive={item.isActive} onClick={() => props.navigate(item.route)}>
                        {item.label}
                      </Tabs.Tab>
                    )}
                  </For>
                </Tabs>
              </nav>
              <div class={styles.applicationNavigationActions}>
                <Show when={props.user}>
                  {(user) => (
                    <DropDown.Menu
                      store={userDropDownStore}
                      handleElement={
                        <Avatar.User isClickable name={user().name} email={user().email} showName={false} />
                      }
                      contentElement={
                        <For each={props.userItems}>
                          {(item) => <List.Item onClick={() => handleUserItemClick(item)}>{item.label}</List.Item>}
                        </For>
                      }
                    />
                  )}
                </Show>
              </div>
            </div>
          </Show>
          <div class="p-sm h-full min-h-[1px]">
            <ScrollArea>
              <div class={styles.applicationMainContent}>{props.children}</div>
            </ScrollArea>
          </div>
        </Show>
      </div>
    </>
  );
};

export default ApplicationFrame;
