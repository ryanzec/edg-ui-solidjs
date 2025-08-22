import { mergeProps, splitProps } from 'solid-js';
import Icon from '$/core/components/icon';
import Input, { type InputProps } from '$/core/components/input/input';
import type { DebounceUpdateStore } from '$/core/stores/debounced-update.store';

export type InputDebouncedSearchProps = Pick<InputProps, 'placeholder' | 'name'> & {
  debouncedUpdateStore: DebounceUpdateStore;
};

const InputDebouncedSearch = (passedProps: InputDebouncedSearchProps) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        placeholder: 'Search',
        name: 'search',
      },
      passedProps,
    ),
    ['debouncedUpdateStore'],
  );

  const handleInputChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    props.debouncedUpdateStore.setDisplayValue(value);
    props.debouncedUpdateStore.setDebouncedValue(value);
  };

  return (
    <Input
      data-id="input-debounced-search"
      preElement={<Icon icon="magnifying-glass" />}
      {...restOfProps}
      value={props.debouncedUpdateStore.displayValue()}
      onInput={handleInputChange}
    />
  );
};

export default InputDebouncedSearch;
