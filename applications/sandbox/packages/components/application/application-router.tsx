import { Navigate, Route, Router } from '@solidjs/router';
import { For, createEffect } from 'solid-js';

import ApplicationContainer from '$sandbox/components/application/application-container';
import { applicationStore } from '$sandbox/stores/application-store';
import { dynamicRoutesStore } from '$sandbox/stores/dynamic-routes';
import HomeView from '$sandbox/views/home-view';
import { applicationDataAttribute } from '$web/utils/application';

const ApplicationRouter = () => {
  dynamicRoutesStore.load();

  createEffect(function updateDataThemeAttribute() {
    // we want to attach the theme data attribute to the body element because certain components use the Portal
    // functionality (global notifications, dialogs, etc.) to attach itself to the DOM and since theme css
    // variable are created based on this data attribute, we want to make sure those components have access to
    // those variables
    document.body.setAttribute(applicationDataAttribute.THEME, applicationStore.theme());
  });

  return (
    <Router root={ApplicationContainer}>
      {/* these are the dynamic routes that are based on the files dynamically loaded with sandbox components */}
      <For each={dynamicRoutesStore.routes()}>
        {(route) => {
          return <Route path={route.path} component={route.component} />;
        }}
      </For>
      <Route path="/" component={HomeView} />
      <Route path="*" component={() => <Navigate href="/" />} />
    </Router>
  );
};

export default ApplicationRouter;
