import { createSignal } from 'solid-js';
import Button from '$/core/components/button';
import FormField from '$/core/components/form-field';
import Input from '$/core/components/input';
import Label from '$/core/components/label';

export default {
  title: 'Components/Label',
};

export const Default = () => {
  return (
    <>
      <div>
        <Label>Default Label</Label>
      </div>
    </>
  );
};

export const Loading = () => {
  const [isLoading, setIsLoading] = createSignal(false);

  const toggleLoading = () => {
    setIsLoading(!isLoading());
  };
  return (
    <>
      <Button onClick={toggleLoading}>Toggle Loading</Button>
      <FormField>
        <div>above content to make sure content shifting does not happen when loading happens</div>
        <Label isLoading={isLoading()}>Loading</Label>
        <Input />
      </FormField>
    </>
  );
};

export const PostItem = () => {
  return (
    <>
      <div style={{ width: '500px' }}>
        <Label postElement={<Button>Button</Button>}>With Post Item</Label>
      </div>
    </>
  );
};
