import { debounce } from 'lodash';
import { type Accessor, createEffect, createSignal } from 'solid-js';

export type DebounceUpdateStore = {
  displayValue: Accessor<string>;
  setDisplayValue: (value: string) => void;
  debouncedValue: Accessor<string>;
  setDebouncedValue: (value: string) => void;
};

export type CreateDebounceUpdateStoreOptions = {
  debounceTime?: number;
  defaultDisplayValue?: string;
  onDisplayValueChange?: (value: string) => void;
  onDebouncedValueChange?: (value: string) => void;
};

export const createDebounceUpdateStore = (options: CreateDebounceUpdateStoreOptions): DebounceUpdateStore => {
  const [displayValue, setDisplayValue] = createSignal<string>(options.defaultDisplayValue ?? '');
  const [debouncedValue, internalSetDebouncedValue] = createSignal<string>(options.defaultDisplayValue ?? '');

  const setDebouncedValue = debounce((value: string) => {
    internalSetDebouncedValue(value);
  }, options.debounceTime ?? 350);

  createEffect(function displayValueChanged() {
    options.onDisplayValueChange?.(displayValue());
  });

  createEffect(function debouncedValueChanged() {
    options.onDebouncedValueChange?.(debouncedValue());
  });

  return {
    displayValue,
    setDisplayValue,
    debouncedValue,
    setDebouncedValue,
  };
};

export const debouncedUpdateStoreUtils = {
  createStore: createDebounceUpdateStore,
};
