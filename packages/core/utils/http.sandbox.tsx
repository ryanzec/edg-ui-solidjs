import Button from '../components/button';
import { HttpAbortError, httpUtils } from './http';

export default {
  title: 'Utils/Http',
};

export const CancelRequest = () => {
  const controller = new AbortController();

  const handleMakeRequest = async () => {
    try {
      console.log('starting request');
      const response = await httpUtils.http('https://localhost:3000/health/delayed', {
        signal: controller.signal,
      });

      console.log(response);
    } catch (error: unknown) {
      if (error instanceof HttpAbortError) {
        console.log('aborted', error.message);

        // if the abort needs no extra handling, just return otherwise you can add in extra handling of the abort
        // as needed

        return;
      }

      console.log(error);
    }
  };

  const handleCancelRequest = () => {
    controller.abort(new HttpAbortError('test'));
  };

  return (
    <>
      <Button onClick={handleMakeRequest}>Start Request</Button>
      <Button onClick={handleCancelRequest}>Cancel Request</Button>
    </>
  );
};
