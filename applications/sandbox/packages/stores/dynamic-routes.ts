import { type Accessor, type JSX, createRoot, createSignal } from 'solid-js';

import { stringUtils } from '$/core/utils/string';

export type DynamicRouteNavigation = {
  [key: string]: DynamicRouteNavigation | string;
};

export type DynamicRoute = {
  path: string;
  title: string;
  component: () => JSX.Element;
};

const setNestedObjectValue = (
  keys: string[],
  nestedObject: DynamicRouteNavigation,
  value: string,
): DynamicRouteNavigation => {
  if (keys.length === 0) {
    return nestedObject;
  }

  const [currentKey, ...restOfKeys] = keys;

  if (restOfKeys.length === 0) {
    nestedObject[currentKey] = value;

    return nestedObject;
  }

  if (!nestedObject[currentKey]) {
    nestedObject[currentKey] = {};
  }

  // we only get here if the nested object property is an object so casting to prevent typescript error
  nestedObject[currentKey] = setNestedObjectValue(
    restOfKeys,
    nestedObject[currentKey] as DynamicRouteNavigation,
    value,
  );

  return nestedObject;
};

export type DynamicRouteStore = {
  routes: Accessor<DynamicRoute[]>;
  navigation: Accessor<DynamicRouteNavigation>;
  isLoading: Accessor<boolean>;
  load: () => void;
};

const createDynamicRoutesStore = (): DynamicRouteStore => {
  const [isLoading, setIsLoading] = createSignal(true);
  const [routes, setRoutes] = createSignal<DynamicRoute[]>([]);
  const [navigation, setNavigation] = createSignal<DynamicRouteNavigation>({});

  const load = async () => {
    const modules = import.meta.glob(['$/**/*.sandbox.tsx']);
    const routes: DynamicRoute[] = [];
    let navigation: DynamicRouteNavigation = {};

    for (const path in modules) {
      // @todo(refactor?) not really sure how to type an dynamic import without knowing what the import is so using
      // biome-ignore lint/suspicious/noExplicitAny: to avoid typescript errors
      const module = (await modules[path]()) as any;
      const moduleExports = Object.keys(module);
      const defaultExport = module.default ?? { title: 'Unknown' };

      for (const moduleExport of moduleExports) {
        // @todo(refactor) this does not guarantee that the named export is a component but we are just going to
        // @todo(refactor) assume for now until a better solution is found
        if (stringUtils.isPascalCase(moduleExport, { allowLeadingUnderscore: true })) {
          const title = `${defaultExport.title}/${moduleExport}`;
          const path = `/${stringUtils.pascalToKabob(`${defaultExport.title}/${moduleExport}`)}`;

          routes.push({
            path,
            title,
            component: module[moduleExport],
          });

          const titleParts = title.split('/');

          navigation = setNestedObjectValue(titleParts, navigation, path);
        }
      }
    }

    setNavigation(navigation);
    setRoutes(routes);
    setIsLoading(false);
  };

  return {
    routes,
    navigation,
    isLoading,
    load,
  };
};

export const dynamicRoutesStore = createRoot(createDynamicRoutesStore);
