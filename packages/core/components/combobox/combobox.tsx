import { type Accessor, For, Show, batch, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import {
  AsyncOptionsState,
  type ComboboxExtraData,
  type ComboboxOption,
  type ComboboxProps,
  comboboxComponentUtils,
  comboboxDataAttribute,
} from '$/core/components/combobox/utils';
import Icon from '$/core/components/icon';
import iconStyles from '$/core/components/icon/icon.module.css';
import Input from '$/core/components/input';
import List from '$/core/components/list';
import type { DefaultFormData } from '$/core/stores/form.store';
import * as _ from 'lodash';

import styles from '$/core/components/combobox/combobox.module.css';
import Options from '$/core/components/combobox/options';
import SelectableOption from '$/core/components/combobox/selectable-option';
import ScrollArea from '$/core/components/scroll-area';
import { tailwindUtils } from '$/core/utils/tailwind';
import { createStore, produce, reconcile } from 'solid-js/store';

type ComboboxGroupedOptions<TData extends ComboboxExtraData> = {
  options: Record<string, ComboboxOption<TData>[]>;
  counts: Record<string, number>;
};

const orderGroupKeys = (allKeys: string[], orderedKeys: string[]) => {
  if (orderedKeys.length === 0) {
    return allKeys;
  }

  const returnValue = [...orderedKeys];

  // we create a set for quicker lookup when all keys that are not in the ordered keys
  const lookupSet = new Set(orderedKeys);

  for (const key of allKeys) {
    if (lookupSet.has(key)) {
      continue;
    }

    returnValue.push(key);
  }

  return returnValue;
};

const Combobox = <TData extends ComboboxExtraData, TFormData = DefaultFormData>(
  passedProps: ComboboxProps<TData, TFormData>,
) => {
  const [props, restOfProps] = splitProps(
    mergeProps(
      {
        placeholder: 'Select option...',
        autoShowOptions: false,
        forceSelection: true,
        isMulti: false,
        asyncDelay: 350,
        removeOnDuplicateSingleSelect: false,
        disabled: false,
        showClearIcon: true,
        ungroupedKey: 'Ungrouped',
        groupOrder: [],
        selectableComponent: SelectableOption,
      },
      passedProps,
    ),
    [
      'selected',
      'setSelected',
      'placeholder',
      'options',
      'autoShowOptions',
      'forceSelection',
      'filterOptions',
      'isMulti',
      'getOptionsAsync',
      'asyncDelay',
      'selectedComponent',
      'selectableComponent',
      'onDeleteOption',
      'asyncThreshold',
      'removeOnDuplicateSingleSelect',
      'showClearIcon',
      'class',
      'ungroupedKey',
      'groupOrder',
      'formData',
      'inputClass',
      'inputContainerClass',

      // we move out the id in order to assign it to the input so things like label for works
      'id',
      'name',
      'disabled',
    ],
  );

  const comboboxStore = comboboxComponentUtils.createStore(props);

  // since the order of the option change might be different than they appear in the options list so we store this
  // separately
  const [groupedOptionKeys, setGroupedOptionKeys] = createSignal<string[]>([]);

  const [finalGroupedOptionsStore, setFinalGroupedOptionsStore] = createStore<ComboboxGroupedOptions<TData>>({
    options: {},
    counts: {},
  });

  const totalOptionsCount = () => {
    return _.sum(Object.values(finalGroupedOptionsStore.counts));
  };

  const handleClearValue = (event: Event) => {
    event.stopPropagation();

    if (comboboxStore.inputHasClearableValue()) {
      comboboxStore.clearSelection(false);
    }
  };

  const handleFocusInputAndOpen = (event: Event) => {
    event.stopPropagation();

    comboboxStore.triggerCombobox({ openOptions: true });
  };

  const handleFocusInput = () => {
    comboboxStore.triggerCombobox();
  };

  const clearFinalGroupedOptionsStore = () => {
    setFinalGroupedOptionsStore(
      produce((currentStore: ComboboxGroupedOptions<TData>) => {
        currentStore.options = {};
        currentStore.counts = {};
      }),
    );
  };

  const dynamicProps = {
    [comboboxDataAttribute.GROUPED]: comboboxStore.isGrouped() ? 'true' : 'false',
  };

  createEffect(function updateDisplayOptionsGroupedFormat() {
    if (comboboxStore.store.isOpened === false) {
      batch(() => {
        clearFinalGroupedOptionsStore();
        setGroupedOptionKeys([]);
      });

      return;
    }

    const defaultGroupKey = comboboxStore.isGrouped() ? props.ungroupedKey : '';
    const groupedDisplayOptions = comboboxStore.store.displayOptions.reduce<Record<string, ComboboxOption<TData>[]>>(
      (collector, displayOption) => {
        const groupKey = displayOption.groupKey ?? defaultGroupKey;

        if (!collector[groupKey]) {
          collector[groupKey] = [];
        }

        collector[groupKey].push({ ...displayOption });

        return collector;
      },
      {},
    );

    const finalGroupedOptions: ComboboxGroupedOptions<TData> = { counts: {}, options: {} };
    let newGroupedOptionKeys: string[] = [];

    for (const groupKey in groupedDisplayOptions) {
      newGroupedOptionKeys.push(groupKey);
      finalGroupedOptions.options[groupKey] = groupedDisplayOptions[groupKey];
      finalGroupedOptions.counts[groupKey] = groupedDisplayOptions[groupKey].length;
    }

    newGroupedOptionKeys = orderGroupKeys(newGroupedOptionKeys, props.groupOrder);

    batch(() => {
      if (newGroupedOptionKeys.length === 0) {
        clearFinalGroupedOptionsStore();

        return;
      }

      for (let i = 0; i < newGroupedOptionKeys.length; i++) {
        const groupKey = newGroupedOptionKeys[i];

        if (!finalGroupedOptionsStore.options[groupKey]) {
          setFinalGroupedOptionsStore('options', groupKey, finalGroupedOptions.options[groupKey]);
          setFinalGroupedOptionsStore('counts', groupKey, finalGroupedOptions.counts[groupKey]);

          continue;
        }

        setFinalGroupedOptionsStore('options', groupKey, reconcile(finalGroupedOptions.options[groupKey]));
        setFinalGroupedOptionsStore('counts', groupKey, finalGroupedOptions.counts[groupKey]);
      }

      if (_.isEqual(groupedOptionKeys(), newGroupedOptionKeys) === false) {
        setGroupedOptionKeys(newGroupedOptionKeys);
      }
    });
  });

  return (
    <div
      data-id="combobox"
      {...restOfProps}
      class={tailwindUtils.merge(styles.combobox, props.class)}
      {...dynamicProps}
    >
      <button type="button" onClick={handleFocusInput} tabindex="-1">
        <Input
          {...comboboxStore.getInputProps()}
          readonly={!props.filterOptions}
          includeReadonlyStyles={false}
          inputContainerClass={tailwindUtils.merge(styles.inputContainer, props.inputContainerClass, {
            [styles.opened]: comboboxStore.store.isOpened,
          })}
          class={tailwindUtils.merge(styles.input, props.inputClass)}
          type="text"
          data-uncontrolled-value="true"
          disabled={props.disabled}
          preItemIsInline
          inlineItem={
            <Show when={props.isMulti && props.selected.length > 0 && !!props.selectedComponent}>
              <For each={props.selected}>
                {(option: ComboboxOption<TData>, optionIndex: Accessor<number>) => {
                  return (
                    <Dynamic
                      component={passedProps.selectedComponent}
                      {...comboboxStore.getSelectedOptionProps()}
                      option={option}
                      optionIndex={optionIndex()}
                    />
                  );
                }}
              </For>
            </Show>
          }
          postItem={
            props.disabled ? null : (
              <div class={styles.inputActions}>
                <Show
                  when={props.showClearIcon && !comboboxStore.store.isOpened && comboboxStore.inputHasClearableValue()}
                >
                  <Icon data-id="clear-icon-trigger" icon="x" onClick={handleClearValue} />
                </Show>
                <Icon data-id="input-icon-indicator" icon="caret-down" onClick={handleFocusInputAndOpen} />
              </div>
            )
          }
          postItemIsClickable
        />
      </button>
      <Show when={comboboxStore.store.isOpened}>
        <button type="button">
          <List
            data-id="selectable-options"
            ref={comboboxStore.optionsContainerRef}
            class={tailwindUtils.merge(styles.list, {
              [styles.openedList]: comboboxStore.store.isOpened,
            })}
          >
            <ScrollArea>
              <Show when={comboboxStore.asyncOptionsAreLoading()}>
                <List.Item data-id="async-options-loading" class={styles.listOption}>
                  <Icon class={tailwindUtils.merge(styles.loadingIndicator, iconStyles.spacingRight)} icon="spinner" />{' '}
                  Loading...
                </List.Item>
              </Show>
              <Show when={comboboxStore.store.asyncOptionsState === AsyncOptionsState.BEFORE_THRESHOLD}>
                <List.Item data-id="async-options-before-threshold" class={styles.listOption}>
                  Type {comboboxStore.store.asyncThreshold} characters for options...
                </List.Item>
              </Show>
              <Show when={comboboxStore.showOptions()}>
                <Show
                  when={totalOptionsCount() > 0}
                  fallback={
                    <Show when={!comboboxStore.asyncOptionsAreLoading()}>
                      <List.Item data-id="no-options-found" class={styles.listOption}>
                        No Options Found
                      </List.Item>
                    </Show>
                  }
                >
                  <For each={groupedOptionKeys()}>
                    {(optionKey) => {
                      return (
                        <Options
                          options={finalGroupedOptionsStore.options[optionKey]}
                          groupLabel={optionKey}
                          selectableComponent={props.selectableComponent}
                          asyncOptionsAreLoading={comboboxStore.asyncOptionsAreLoading}
                          getSelectionOptionProps={comboboxStore.getSelectionOptionProps}
                          indexOffset={0}
                        />
                      );
                    }}
                  </For>
                </Show>
              </Show>
            </ScrollArea>
          </List>
        </button>
      </Show>
    </div>
  );
};

export default Combobox;
