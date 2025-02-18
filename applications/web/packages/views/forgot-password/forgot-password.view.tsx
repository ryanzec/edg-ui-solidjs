import Page from '$/application/components/page';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import { CalloutColor } from '$/core/components/callout';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { formStoreUtils } from '$/core/stores/form.store';
import { globalNotificationsStore } from '$/core/stores/global-notifications.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';
import * as zod from 'zod';

export type ForgotPasswordFormData = {
  email: string;
};

export const forgotPasswordFormSchema = zodUtils.schemaForType()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

const ForgotPasswordView = () => {
  const formStore = formStoreUtils.createStore<ForgotPasswordFormData>({
    schema: forgotPasswordFormSchema,
    onSubmit: async (data: Partial<ForgotPasswordFormData>) => {
      if (!data.email) {
        return;
      }

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.sendResetPassword(data as ForgotPasswordFormData);

      globalNotificationsStore.addNotification({
        message: () => 'Reset password email sent if provided email is valid',
        color: CalloutColor.SUCCESS,
      });

      return;
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <Page>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" autofocus />
          </FormField>
          <Button type="submit">Send Reset Password Email</Button>
        </FormFields>
      </form>
    </Page>
  );
};

export default ForgotPasswordView;
