import styles from '$/application/components/user-form/user-form.module.css';
import Button from '$/core/components/button';
import Checkbox from '$/core/components/checkbox';
import FormError from '$/core/components/form-error';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { FormSaveMode, formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import { type User, UserRoleName, assignableUserRoles } from '$api/types/user';
import { type Accessor, For, Show, createEffect, createMemo, mergeProps } from 'solid-js';
import * as zod from 'zod';

export type CreateUserFormData = {
  name: string;
  email: string;
  roles: string[];
  oldPassword?: string;
  password: string;
  confirmPassword: string;
};

export type UpdateUserFormData = {
  name: string;
  email: string;
  roles: string[];
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
};

const buildCreateUserFormSchema = (formData: Accessor<Partial<CreateUserFormData>>) => {
  const schema = zodUtils.schemaForType<CreateUserFormData>()(
    zod.object({
      name: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      roles: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      password: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value, context) => {
          if (!formData().confirmPassword || value === formData().confirmPassword) {
            return;
          }

          context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'Passwords do not match',
          });
        }),
      confirmPassword: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value, context) => {
          if (!formData().password || value === formData().password) {
            return;
          }

          context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'Passwords do not match',
          });
        }),
    }),
  );

  return schema;
};

const buildUpdateUserFormSchema = (formData: Accessor<Partial<UpdateUserFormData>>) => {
  const schema = zodUtils.schemaForType<UpdateUserFormData>()(
    zod.object({
      name: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      roles: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      oldPassword: zod
        .string()
        .optional()
        .superRefine((value, context) => {
          if (!formData().password || !formData().confirmPassword) {
            return;
          }

          context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'old password is required to change the password',
          });
        }),
      password: zod
        .string()
        .optional()
        .superRefine((value, context) => {
          if (!formData().confirmPassword || value === formData().confirmPassword) {
            return;
          }

          schema.shape.confirmPassword.safeParse(formData().confirmPassword);
          context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'Passwords do not match',
          });
        }),
      confirmPassword: zod
        .string()
        .optional()
        .superRefine((value, context) => {
          if (!formData().password || value === formData().password) {
            return;
          }

          schema.shape.password.safeParse(formData().password);
          context.addIssue({
            code: zod.ZodIssueCode.custom,
            message: 'Passwords do not match',
          });
        }),
    }),
  );

  return schema;
};

export type UserFormProps<TCreateInput, TUpdateInput> = {
  editingUser?: Pick<User, 'id' | 'name' | 'email' | 'roles'>;
  useButton?: boolean;
  submitButtonRef?: (element: HTMLButtonElement) => void;
  onFormSubmitted?: (data: CreateUserFormData | UpdateUserFormData) => void;
  onSubmitForm?: () => void;
  formError: string | string[] | undefined;
  processForm: (saveMode: FormSaveMode, data: TCreateInput | TUpdateInput) => Promise<void>;
  isProcessingForm: boolean;
};

const defaultRoles = [UserRoleName.USER];

const UserForm = <TCreateInput, TUpdateInput>(passedProps: UserFormProps<TCreateInput, TUpdateInput>) => {
  const props = mergeProps({ useButton: true }, passedProps);

  const isEditing = createMemo<boolean>(() => !!props.editingUser?.id);

  const formStore = formStoreUtils.createStore<CreateUserFormData | UpdateUserFormData>({
    buildSchema: props.editingUser ? buildUpdateUserFormSchema : buildCreateUserFormSchema,
    validateWith: {
      password: ['confirmPassword'],
      confirmPassword: ['password'],
    },
    onSubmit: async (data: Partial<CreateUserFormData | UpdateUserFormData>) => {
      if (!data.email || !data.name || !data.roles) {
        return;
      }

      props.onSubmitForm?.();

      if (props.editingUser) {
        await props.processForm(FormSaveMode.UPDATE, { id: props.editingUser.id, ...(data as TUpdateInput) });

        props.onFormSubmitted?.(data as CreateUserFormData);
        formStore.clear();

        return;
      }

      await props.processForm(FormSaveMode.CREATE, data as TCreateInput);

      props.onFormSubmitted?.(data as UpdateUserFormData);
      formStore.clear();
    },
  });

  createEffect(function updateWithEditingUser() {
    if (!props.editingUser) {
      formStore.setValues(
        {
          name: '',
          email: '',
          roles: defaultRoles,
        },
        {
          markAsTouched: false,
        },
      );

      return;
    }

    formStore.setValues({
      name: props.editingUser?.name || '',
      email: props.editingUser?.email || '',
      roles: props.editingUser?.roles || defaultRoles,
    });
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <FormError errorMessage={props.formError} />
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().name?.errors}>
            <Label>Name</Label>
            <Input type="text" formData={formStore.data} name="name" autofocus={!props.editingUser} />
          </FormField>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" readonly={isEditing()} />
          </FormField>
          <Show when={isEditing()}>
            <FormField errors={formStore.errors().oldPassword?.errors}>
              <Label>Old Password</Label>
              <Input type="password" formData={formStore.data} name="oldPassword" />
            </FormField>
          </Show>
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="password" formData={formStore.data} name="password" />
          </FormField>
          <FormField errors={formStore.errors().confirmPassword?.errors}>
            <Label>Confirm Password</Label>
            <Input type="password" formData={formStore.data} name="confirmPassword" />
          </FormField>
          <FormField errors={formStore.errors().roles?.errors}>
            <Label>Roles</Label>
            <Checkbox.Group>
              <For each={assignableUserRoles}>
                {(role) => {
                  return <Checkbox labelElement={role} name="roles" value={role} formData={formStore.data} />;
                }}
              </For>
            </Checkbox.Group>
          </FormField>
          <Button.Group class={props.useButton ? '' : styles.hidden}>
            <Button disabled={props.isProcessingForm} ref={props.submitButtonRef} type="submit">
              {props.editingUser ? 'Update' : 'Create'}
            </Button>
          </Button.Group>
        </FormFields>
      </form>
    </div>
  );
};

export default UserForm;
