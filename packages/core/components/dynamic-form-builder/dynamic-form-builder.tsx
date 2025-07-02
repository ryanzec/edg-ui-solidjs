import Checkbox from '$/core/components/checkbox';
import Combobox, {
  comboboxComponentUtils,
  type ComboboxOption,
  type ComboboxValueStore,
} from '$/core/components/combobox';
import DynamicFormBuilderObjectArray from '$/core/components/dynamic-form-builder/dynamic-form-builder-object-array';
import styles from '$/core/components/dynamic-form-builder/dynamic-form-builder.module.css';
import {
  DynamicFormBuilderFieldType,
  type DynamicFormBuilderFields,
  type DynamicFormBuilderProps,
} from '$/core/components/dynamic-form-builder/utils';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import Radio from '$/core/components/radio';
import Textarea from '$/core/components/textarea';
import { ValidationMessageType } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import classnames from 'classnames';
import * as lodash from 'lodash';
import { For, Show, createEffect, createReaction, createSignal } from 'solid-js';
import * as zod from 'zod';

const DynamicFormBuilder = <TFormData extends object>(props: DynamicFormBuilderProps<TFormData>) => {
  const stringTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
    DynamicFormBuilderFieldType.RADIO,
    DynamicFormBuilderFieldType.TEXTAREA,
    DynamicFormBuilderFieldType.SELECT,
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
  const comboboxTypes: DynamicFormBuilderFieldType[] = [DynamicFormBuilderFieldType.SELECT];

  const [comboboxValueStores, setComboboxValueStores] = createSignal<Record<string, ComboboxValueStore>>({});

  const buildSchemaForFields = (fields: DynamicFormBuilderFields): Record<string, zod.ZodType> => {
    const schema: Record<string, zod.ZodType> = {};

    for (const input of fields) {
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

        continue;
      }

      if (input.type === DynamicFormBuilderFieldType.COMPLEX) {
        schema[input.name as string] = zod
          .object({ ...buildSchemaForFields(input.nestedFields || []) })
          .optional()
          // this will make sure the nested object validation is run and not just at the top level
          .default({});

        continue;
      }

      if (input.type === DynamicFormBuilderFieldType.COMPLEX_ARRAY) {
        if (input.required) {
          schema[input.name as string] = zod
            .array(
              zod
                .object({ ...buildSchemaForFields(input.nestedFields || []) })
                .optional()
                // this will make sure the nested object validation is run and not just at the top level
                .default({}),
            )
            .min(1, ValidationMessageType.REQUIRED);

          continue;
        }

        schema[input.name as string] = zod
          .array(
            zod
              .object({ ...buildSchemaForFields(input.nestedFields || []) })
              .optional()
              // this will make sure the nested object validation is run and not just at the top level
              .default({}),
          )
          .optional();
      }
    }

    return schema;
  };

  createEffect(function buildFormSchema() {
    if (props.namePrefix) {
      return;
    }

    let schema: Record<string, zod.ZodType> = {
      ...props.staticFormSchema,
    };

    schema = { ...schema, ...buildSchemaForFields(props.fields) };

    // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
    props.formStore.setSchema(zodUtils.schemaForType<TFormData>()(zod.object(schema)));
  });

  const buildComboboxesForFields = (fields: DynamicFormBuilderFields) => {
    let newComboboxValueStores: Record<string, ComboboxValueStore> = {};

    for (const input of fields) {
      if (comboboxTypes.includes(input.type)) {
        newComboboxValueStores[input.name as string] = comboboxComponentUtils.createValueStore();
      }

      if (input.nestedFields) {
        newComboboxValueStores = { ...newComboboxValueStores, ...buildComboboxesForFields(input.nestedFields) };
      }
    }

    return newComboboxValueStores;
  };

  createEffect(function buildComboboxValueStores() {
    setComboboxValueStores(buildComboboxesForFields(props.fields));
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
        continue;
      }

      const selectedLabel =
        fieldStructure?.options?.find((option) => option.value === selectedValue)?.label || selectedValue;

      comboboxValueStores()[fieldName].setSelected([
        {
          value: selectedValue,
          label: selectedLabel,
        },
      ]);
    }
  });

  initializeComboboxValues(() => comboboxValueStores());

  return (
    <FormFields
      class={classnames({
        [styles.enclosedForm]: props.encloseForm,
      })}
    >
      <For each={props.fields}>
        {(field) => {
          // since we need this as a keyof TFormData more often, casting here and then casting as a string as needed below
          const fieldName = (props.namePrefix ? `${props.namePrefix}.${field.name}` : field.name) as keyof TFormData;

          const getFieldError = (): string[] => {
            return (lodash.get(props.formStore.errors(), `${fieldName as string}.errors`) || []) as string[];
          };

          return (
            <FormField errors={getFieldError()}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Show when={inputTypes.includes(field.type)}>
                <Input
                  type={field.type}
                  name={fieldName}
                  formData={props.formStore.data}
                  placeholder={field.placeholder}
                  readonly={field.readonly ?? false}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.TEXTAREA}>
                <Textarea
                  name={fieldName}
                  formData={props.formStore.data}
                  placeholder={field.placeholder}
                  readonly={field.readonly ?? false}
                />
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
                          readonly={field.readonly ?? false}
                        />
                      );
                    }}
                  </For>
                </Radio.Group>
              </Show>
              <Show
                when={
                  field.type === DynamicFormBuilderFieldType.CHECKBOX ||
                  field.type === DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE
                }
              >
                <Checkbox.Group>
                  <For each={field.options}>
                    {(option) => {
                      return (
                        <Checkbox
                          labelElement={option.label}
                          name={fieldName}
                          value={option.value}
                          formData={props.formStore.data}
                          readonly={field.readonly ?? false}
                        />
                      );
                    }}
                  </For>
                </Checkbox.Group>
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.SELECT && comboboxValueStores()[field.name]}>
                <Combobox
                  forceSelection
                  autoShowOptions
                  options={field.options || []}
                  setSelected={(options: ComboboxOption[]) => {
                    props.formStore.setValue(fieldName, options[0]?.value ?? '');
                    comboboxValueStores()[field.name].setSelected(options);
                  }}
                  selected={comboboxValueStores()[field.name].selected()}
                  placeholder={field.placeholder}
                  name={fieldName as keyof TFormData}
                  selectableComponent={Combobox.SelectableOption}
                  formData={props.formStore.data}
                  disabled={field.readonly ?? false}
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.TEXT_MULTIPLE}>
                <Input.Multiple formStore={props.formStore} fieldName={fieldName} />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.COMPLEX}>
                <DynamicFormBuilder
                  namePrefix={fieldName as string}
                  fields={field.nestedFields || []}
                  formStore={props.formStore}
                  encloseForm
                />
              </Show>
              <Show when={field.type === DynamicFormBuilderFieldType.COMPLEX_ARRAY}>
                <DynamicFormBuilderObjectArray
                  // while this might seem weird (and it is), it is being done to avoid circular dependency issues
                  DynamicFormBuilderComponent={DynamicFormBuilder}
                  fieldName={fieldName}
                  formStore={props.formStore}
                  nestedFields={field.nestedFields}
                  countLimit={field.arrayLimit}
                />
              </Show>
            </FormField>
          );
        }}
      </For>
    </FormFields>
  );
};

export default DynamicFormBuilder;
