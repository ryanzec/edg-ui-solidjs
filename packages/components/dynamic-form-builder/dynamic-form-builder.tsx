import Checkbox from '$/components/checkbox';
import { DynamicFormBuilderFieldType, type DynamicFormBuilderFields } from '$/components/dynamic-form-builder/utils';
import FormField from '$/components/form-field';
import Input from '$/components/input';
import Label from '$/components/label';
import Radio from '$/components/radio';
import Textarea from '$/components/textarea';
import type { CreateFormStoreReturn } from '$/stores/form.store';
import { loggerUtils } from '$/utils/logger';
import { ValidationMessageType } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { For, Show, createEffect } from 'solid-js';
import type { ZodType } from 'zod';
import * as zod from 'zod';

export type DynamicFormBuilderProps<TFormData extends object> = {
  fields: DynamicFormBuilderFields<TFormData>;
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
  ];
  const inputTypes: DynamicFormBuilderFieldType[] = [
    DynamicFormBuilderFieldType.TEXT,
    DynamicFormBuilderFieldType.PASSWORD,
    DynamicFormBuilderFieldType.NUMBER,
  ];

  createEffect(function buildFormSchema() {
    const schema: Record<string, ZodType> = {
      ...props.staticFormSchema,
    };

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
          schema[input.name as string] = zod.string().array().min(1, ValidationMessageType.REQUIRED);

          continue;
        }

        schema[input.name as string] = zod.string().array().optional();
      }
    }

    // @ts-expect-error don't know how of even if it is possible for typescript to understand this code so f-it
    props.formStore.setSchema(zodUtils.schemaForType<TFormData>()(zod.object(schema)));
  });

  return (
    <For each={props.fields}>
      {(field) => {
        if (inputTypes.includes(field.type)) {
          return (
            <FormField errors={props.formStore.errors()[field.name]?.errors}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Input
                type={field.type}
                name={field.name}
                formData={props.formStore.data}
                placeholder={field.placeholder}
              />
            </FormField>
          );
        }

        if (field.type === DynamicFormBuilderFieldType.TEXTAREA) {
          return (
            <FormField errors={props.formStore.errors()[field.name]?.errors}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Textarea name={field.name} formData={props.formStore.data} placeholder={field.placeholder} />
            </FormField>
          );
        }

        if (field.type === DynamicFormBuilderFieldType.RADIO) {
          return (
            <FormField errors={props.formStore.errors()[field.name]?.errors}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Radio.Group>
                <For each={field.options}>
                  {(option) => {
                    return (
                      <Radio
                        labelElement={option.label}
                        name={field.name}
                        value={option.value}
                        formData={props.formStore.data}
                      />
                    );
                  }}
                </For>
              </Radio.Group>
            </FormField>
          );
        }

        if (
          field.type === DynamicFormBuilderFieldType.CHECKBOX ||
          field.type === DynamicFormBuilderFieldType.CHECKBOX_MULTIPLE
        ) {
          return (
            <FormField errors={props.formStore.errors()[field.name]?.errors}>
              <Show when={field.label}>
                <Label>{field.label}</Label>
              </Show>
              <Checkbox.Group>
                <For each={field.options}>
                  {(option) => {
                    return (
                      <Checkbox
                        labelElement={option.label}
                        name={field.name}
                        value={option.value}
                        formData={props.formStore.data}
                      />
                    );
                  }}
                </For>
              </Checkbox.Group>
            </FormField>
          );
        }

        loggerUtils.error(`attempted to build unsupported input type of '${field.type}' that is not supported`);

        return null;
      }}
    </For>
  );
};

export default DynamicFormBuilder;
