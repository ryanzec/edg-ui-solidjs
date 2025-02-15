import Checkbox from '$/core/components/checkbox';
import Combobox, {
  type ComboboxValueStore,
  comboboxComponentUtils,
  type ComboboxOption,
} from '$/core/components/combobox';
import {
  DynamicFormBuilderFieldType,
  type DynamicFormBuilderFields,
} from '$/core/components/dynamic-form-builder/utils';
import FormField from '$/core/components/form-field';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import Radio from '$/core/components/radio';
import Textarea from '$/core/components/textarea';
import type { CreateFormStoreReturn } from '$/core/stores/form.store';
import { ValidationMessageType } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import { For, Show, createEffect, createReaction, createSignal } from 'solid-js';
import type { ZodType } from 'zod';
import * as zod from 'zod';

export type DynamicFormBuilderProps<TFormData extends object> = {
  fields: DynamicFormBuilderFields;
  formStore: CreateFormStoreReturn<TFormData>;
  staticFormSchema?: Record<string, ZodType>;
};

const DynamicFormBuilder = <TFormData extends object>(props: DynamicFormBuilderProps<TFormData>) => {
  const stringTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
    DynamicFormBuilderFieldType.RADIO,
    DynamicFormBuilderFieldType.TEXTAREA,
  ];
  const arrayStringTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.CHECKBOX,
    DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE,
    DynamicFormBuilderFieldType.TEXT_MULTIPLE,
  ];
  const inputTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
  ];
  const checkboxTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.CHECKBOX,
    DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE,
  ];
  const comboboxTypes: DynamicFormBuilderFieldType[] = [DynamicFormBuilderFieldType.SELECT];

  const [comboboxValueStores, setComboboxValueStores] = createSignal<Record<string, ComboboxValueStore>>({});

  createEffect(function buildFormSchema() {
    const schema: Record<string, ZodType> = {
      ...props.staticFormSchema,
    };
    const newComboboxValueStores: Record<string, ComboboxValueStore> = {};

    for (const input of props.fields) {
      if (stringTypes.includes(input.type)) {
        if (input.required) {
          schema[input.name as string] = zod.string().min(1, ValidationMessageType.REQUIRED);

          continue;
        }

        schema[input.name as string] = zod.string().optional();

        continue;
      }

      if (arrayStringTypes.includes(input.type)) {
        if (input.required) {
          schema[input.name as string] = zod
            .array(zod.string().min(1, ValidationMessageType.REQUIRED))
            .min(1, ValidationMessageType.REQUIRED);

          continue;
        }

        schema[input.name as string] = zod.array(zod.string().min(1, ValidationMessageType.REQUIRED)).optional();
      }

      if (comboboxTypes.includes(input.type)) {
        newComboboxValueStores[input.name as string] = comboboxComponentUtils.createValueStore();
      }
    }

    setComboboxValueStores(newComboboxValueStores);

    // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
    props.formStore.setSchema(zodUtils.schemaForType<TFormData>()(zod.object(schema)));
  });

  const initializeComboboxValues = createReaction(() => {
    const comboboxFieldNames = Object.keys(comboboxValueStores());

    if (!props.formStore || props.fields.length === 0 || comboboxFieldNames.length === 0) {
      initializeComboboxValues(() => comboboxValueStores());
    }

    const formData = props.formStore.data();

    for (const fieldName of comboboxFieldNames) {
      const fieldStructure = props.fields.find((field) => field.name === fieldName);

      // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
      const selectedValue = formData[fieldName];

      if (!selectedValue) {
        return;
      }

      const selectedLabel =
        fieldStructure?.options?.find((option) => option.value === selectedValue)?.label || selectedValue;

      comboboxValueStores()[fieldName].setSelected([
        {
          label: selectedLabel,
          value: selectedValue,
        },
      ]);
    }
  });

  initializeComboboxValues(() => comboboxValueStores());

  return (
    <For each={props.fields}>
      {(field) => {
        const fieldName = field.name as keyof TFormData;

        return (
          <FormField errors={props.formStore.errors()[fieldName]?.errors}>
            <Show when={field.label}>
              <Label>{field.label}</Label>
            </Show>
            <Show when={inputTypes.includes(field.type)}>
              <Input
                type={field.type}
                name={fieldName}
                formData={props.formStore.data}
                placeholder={field.placeholder}
              />
            </Show>
            <Show when={field.type === DynamicFormBuilderFieldType.TEXTAREA}>
              <Textarea name={fieldName} formData={props.formStore.data} placeholder={field.placeholder} />
            </Show>
            <Show when={field.type === DynamicFormBuilderFieldType.RADIO}>
              <Radio.Group>
                <For each={field.options}>
                  {(option) => {
                    return (
                      <Radio
                        labelElement={option.label}
                        name={fieldName}
                        value={option.value}
                        formData={props.formStore.data}
                      />
                    );
                  }}
                </For>
              </Radio.Group>
            </Show>
            <Show when={checkboxTypes.includes(field.type)}>
              <Checkbox.Group>
                <For each={field.options}>
                  {(option) => {
                    return (
                      <Checkbox
                        labelElement={option.label}
                        name={fieldName}
                        value={option.value}
                        formData={props.formStore.data}
                      />
                    );
                  }}
                </For>
              </Checkbox.Group>
            </Show>
            <Show when={comboboxTypes.includes(field.type) && comboboxValueStores()[field.name]}>
              <Combobox
                forceSelection
                autoShowOptions
                options={field.options || []}
                filterOptions={comboboxComponentUtils.excludeSelectedFilter}
                setSelected={(options: ComboboxOption[]) => {
                  props.formStore.setValue(fieldName, options[0]?.value ?? '');
                  comboboxValueStores()[field.name].setSelected(options);
                }}
                selected={comboboxValueStores()[field.name].selected()}
                placeholder={field.placeholder}
                name={fieldName}
                selectableComponent={Combobox.SelectableOption}
                formData={props.formStore.data}
              />
            </Show>
            <Show when={field.type === DynamicFormBuilderFieldType.TEXT_MULTIPLE}>
              <Input.Multiple formStore={props.formStore} fieldName={fieldName} />
            </Show>
          </FormField>
        );
      }}
    </For>
  );
};

export default DynamicFormBuilder;
