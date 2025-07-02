import { createRoot, createSignal } from 'solid-js';

import { localStorageCacheUtils } from '$/core/utils/local-storage-cache';
import { ThemeName } from '$/core/utils/styles';

type InitializeOptions = {
  themeLocalStorageKey: string;
};

export type ThemeManagerStore = {
  initialize: (options: InitializeOptions) => Promise<void>;
  theme: () => ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
};

const createThemeManagerStore = (): ThemeManagerStore => {
  let themeLocalStorageKey = '';

  const [theme, setTheme] = createSignal<ThemeName>(ThemeName.LIGHT);

  const initialize = async (options: InitializeOptions) => {
    themeLocalStorageKey = options.themeLocalStorageKey;

    // @todo(v1) implement OS dark mode detection when dark mode has been better tested
    const isOSDarkMode = false; //window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const overrideThemeMode = localStorageCacheUtils.get<ThemeName>(themeLocalStorageKey);

    setTheme(overrideThemeMode || (isOSDarkMode ? ThemeName.DARK : ThemeName.LIGHT));
  };

  const toggleTheme = () => {
    const newTheme = theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT;

    localStorageCacheUtils.set<ThemeName>(themeLocalStorageKey, newTheme);

    setTheme(newTheme);
  };

  return {
    initialize,
    theme,
    setTheme,
    toggleTheme,
  };
};

const themeManagerStore = createRoot(createThemeManagerStore);

export { themeManagerStore };
