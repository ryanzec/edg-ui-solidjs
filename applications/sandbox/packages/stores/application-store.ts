import { type Accessor, createRoot, createSignal, type Setter } from 'solid-js';

import { ThemeName } from '$/core/utils/styles';

export type ApplicationStore = {
  theme: Accessor<ThemeName>;
  setTheme: Setter<ThemeName>;
  toggleTheme: () => void;
};

const createApplicationStore = (): ApplicationStore => {
  // @todo refactor to use system theming by default
  const [theme, setTheme] = createSignal<ThemeName>(ThemeName.LIGHT);

  const toggleTheme = () => {
    setTheme(theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

const applicationStore = createRoot(createApplicationStore);

export { applicationStore };
