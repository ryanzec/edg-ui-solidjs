import { createSignal } from 'solid-js';

type CreateToggleStoreOptions = {
  defaultIsToggled?: boolean;
};

export type ToggleStore = {
  isToggled: () => boolean;
  setIsToggled: (value: boolean) => void;
  toggle: () => void;
};

const createToggleStore = (options: CreateToggleStoreOptions = {}): ToggleStore => {
  const [isToggled, setIsToggled] = createSignal<boolean>(options.defaultIsToggled ?? false);

  const toggle = () => {
    setIsToggled(!isToggled());
  };

  return {
    isToggled,
    setIsToggled,
    toggle,
  };
};

export const toggleStoreUtils = {
  createStore: createToggleStore,
};
