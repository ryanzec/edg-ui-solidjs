import { usersApi } from '$/application/apis/users';
import styles from '$/application/components/user-form/user-form.module.css';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import Checkbox from '$/core/components/checkbox';
import FormError from '$/core/components/form-error';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import { userUtils } from '$api/data-models/user';
import { type User, UserRoleName, UserRoleSource, forcedUserRoles, userRoleNameToDisplayMap } from '$api/types/user';
import { type Accessor, For, createEffect } from 'solid-js';
import * as zod from 'zod';

export type UserFormData = {
  name: string;
  email: string;
  roles: string[];
};

export const userFormSchema = zodUtils.schemaForType<UserFormData>()(
  zod.object({
    name: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    roles: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

export type UserFormProps = {
  editingUser?: Pick<User, 'id' | 'name' | 'email' | 'roles'>;
  submitButtonRef?: Accessor<HTMLButtonElement | undefined>;
  onFormSubmitted?: (data: UserFormData) => void;
};

const defaultRoles = [
  {
    id: UserRoleName.STYTCH_MEMBER,
    sources: [UserRoleSource.DIRECT_ASSIGNMENT],
  },
];

const UserForm = (props: UserFormProps) => {
  const createUserMutation = usersApi.create();
  const updateUserMutation = usersApi.update();

  const formStore = formStoreUtils.createStore<UserFormData>({
    schema: userFormSchema,
    onSubmit: async (data: Partial<UserFormData>) => {
      if (!data.email || !data.name || !data.roles) {
        return;
      }

      if (props.editingUser) {
        await updateUserMutation.mutate({ id: props.editingUser.id, ...(data as UserFormData) });

        props.onFormSubmitted?.(data as UserFormData);
        formStore.clear();

        return;
      }

      await createUserMutation.mutate(data as UserFormData);

      props.onFormSubmitted?.(data as UserFormData);
      formStore.clear();
    },
  });

  createEffect(function updateWithEditingUser() {
    if (!props.editingUser) {
      formStore.setValues(
        {
          name: '',
          email: '',
          roles: userUtils.rolesToStringArray(defaultRoles),
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
      roles: userUtils.rolesToStringArray(props.editingUser?.roles || defaultRoles),
    });
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <FormError errorMessage={authenticationStore.loginError()} />
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().name?.errors}>
            <Label>Name</Label>
            <Input type="text" formData={formStore.data} name="name" autofocus={!props.editingUser} />
          </FormField>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" />
          </FormField>
          <FormField errors={formStore.errors().roles?.errors}>
            <Label>Roles</Label>
            <Checkbox.Group>
              <For each={Object.values(UserRoleName)}>
                {(roleName) => {
                  return (
                    <Checkbox
                      labelElement={userRoleNameToDisplayMap[roleName]}
                      name="roles"
                      value={roleName}
                      formData={formStore.data}
                      readonly={forcedUserRoles.includes(roleName)}
                    />
                  );
                }}
              </For>
            </Checkbox.Group>
          </FormField>
          <Button.Group class={props.submitButtonRef ? styles.hidden : ''}>
            <Button ref={props.submitButtonRef} type="submit">
              {props.editingUser ? 'Update' : 'Invite'}
            </Button>
          </Button.Group>
        </FormFields>
      </form>
    </div>
  );
};

export default UserForm;
