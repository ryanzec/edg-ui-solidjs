import { useNavigate } from '@solidjs/router';
import { createEffect, onCleanup } from 'solid-js';
import * as zod from 'zod';
import Page from '$/application/components/page';
import { PageLayout } from '$/application/components/page/page';
import { authenticationStore } from '$/application/stores/authentication.store';
import Button from '$/core/components/button';
import FormError from '$/core/components/form-error';
import FormField from '$/core/components/form-field';
import FormFields from '$/core/components/form-fields';
import Input from '$/core/components/input';
import Label from '$/core/components/label';
import { formStoreUtils } from '$/core/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/core/utils/validation';
import { zodUtils } from '$/core/utils/zod';

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginFormSchema = zodUtils.schemaForType()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    password: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

const LoginView = () => {
  const navigate = useNavigate();

  const formStore = formStoreUtils.createStore<LoginFormData>({
    // since this form is simple (and always will be) and there is a use case for clicking a button (forgot)
    // without entering anything in, no going to validate this form on change to avoid when attempting to click
    // the forgot button, the validation message causing the button location to change which would cause the
    // clicking of the forgot button to not work
    validateOnChange: false,
    schema: loginFormSchema,
    onSubmit: async (data: Partial<LoginFormData>) => {
      if (!data.email || !data.password) {
        return;
      }

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.login(data as LoginFormData);
    },
  });

  createEffect(function resetFormOnError() {
    if (authenticationStore.loginError().length === 0) {
      return;
    }

    formStore.setValues({
      email: '',
      password: '',
    });
  });

  const formDirective = formStore.formDirective;

  onCleanup(() => {
    authenticationStore.clearErrors();
  });

  return (
    <Page layout={PageLayout.CENTERED}>
      <form use:formDirective>
        <FormError errorMessage={authenticationStore.loginError()} />
        <FormFields>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" autofocus selectAllOnFocus />
          </FormField>
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="password" formData={formStore.data} name="password" selectAllOnFocus />
          </FormField>
          <Button type="submit">Login</Button>
        </FormFields>
      </form>
    </Page>
  );
};

export default LoginView;
