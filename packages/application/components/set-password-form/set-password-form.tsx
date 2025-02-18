import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import type { Accessor } from 'solid-js';
import * as zod from 'zod';

export type SetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const buildResetPasswordFormSchema = (formData: Accessor<Partial<SetPasswordFormData>>) => {
  const schema = zodUtils.schemaForType<SetPasswordFormData>()(
    zod.object({
      password: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value: string, context: zod.RefinementCtx) => {
          if (!formData()?.confirmPassword || value === formData()?.confirmPassword) {
            return;
          }

          schema.shape.confirmPassword.safeParse(formData()?.confirmPassword);
          context.addIssue({
            code: 'custom',
            message: 'Passwords must match',
          });
        }),
      confirmPassword: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value: string, context: zod.RefinementCtx) => {
          if (!formData()?.password || value === formData()?.password) {
            return;
          }

          schema.shape.password.safeParse(formData()?.confirmPassword);
          context.addIssue({
            code: 'custom',
            message: 'Passwords must match',
          });
        }),
    }),
  );

  return schema;
};

const SetPasswordForm = () => {
  const formStore = formStoreUtils.createStore<SetPasswordFormData>({
    buildSchema: buildResetPasswordFormSchema,
    validateWith: {
      password: ['confirmPassword'],
      confirmPassword: ['password'],
    },
    onSubmit: async (data: Partial<SetPasswordFormData>) => {
      if (!data.password || !data.confirmPassword) {
        return;
      }

      await authenticationStore.resetPassword(data as SetPasswordFormData);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="password" formData={formStore.data} name="password" autofocus />
          </FormField>
          <FormField errors={formStore.errors().confirmPassword?.errors}>
            <Label>Confirm Password</Label>
            <Input type="password" formData={formStore.data} name="confirmPassword" />
          </FormField>
          <Button type="submit">Set Password</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default SetPasswordForm;
