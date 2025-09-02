import Button from '$/core/components/button';
import { AbortReason, HttpAbortError, httpUtils } from '$/core/utils/http';

export default {
  title: 'Utils/Http',
};

export const CancelRequest = () => {
  let controller: AbortController | undefined;

  const handleMakeRequest = async () => {
    try {
      controller?.abort(new HttpAbortError('Aborted this request', AbortReason.NEWER_REQUEST));
      controller = new AbortController();

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

  return (
    <>
      <Button onClick={handleMakeRequest}>Start Request</Button>
    </>
  );
};
