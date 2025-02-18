import { createRoot, createSignal } from 'solid-js';

import { LocalStorageKey } from '$/application/utils/application';
import { localStorageCacheUtils } from '$/core/utils/local-storage-cache';
import { ThemeName } from '$/core/utils/styles';

export type ThemeManagerStore = {
  theme: () => ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const createThemeManagerStore = (): ThemeManagerStore => {
  // @todo enable after dark mode is better tested
  const isOSDarkMode = false; //window.matchMedia('(prefers-color-scheme: dark)').matches;
  const overrideTheme = localStorageCacheUtils.get<ThemeName>(LocalStorageKey.UI_THEME);
  const [theme, setTheme] = createSignal<ThemeName>(overrideTheme || (isOSDarkMode ? ThemeName.DARK : ThemeName.LIGHT));

  const toggleTheme = () => {
    const newTheme = theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT;

    localStorageCacheUtils.set<ThemeName>(LocalStorageKey.UI_THEME, newTheme);

    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

const themeManagerStore = createRoot(createThemeManagerStore);

export { themeManagerStore };
