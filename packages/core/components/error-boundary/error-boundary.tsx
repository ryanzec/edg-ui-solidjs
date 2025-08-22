import type { JSX } from 'solid-js';
import { ErrorBoundary as SolidErrorBoundary } from 'solid-js/web';
import Button, { ButtonColor, ButtonVariant } from '$/core/components/button';
import { loggerUtils } from '$/core/utils/logger';

type ErrorFallbackProps = {
  error: Error;
};

const ErrorFallback = (props: ErrorFallbackProps) => {
  loggerUtils.error({
    type: 'boundary-error',
    error: props.error,
  });

  return (
    <div class="w-full h-full flex flex-col items-center justify-center text-center gap-sm">
      <div class="text-lg font-semibold">Unexpected Error</div>
      <div>
        <Button
          variant={ButtonVariant.FILLED}
          color={ButtonColor.BRAND}
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload Application
        </Button>
      </div>
    </div>
  );
};

const ErrorBoundary = (props: { children: JSX.Element }) => {
  return (
    <SolidErrorBoundary fallback={(error: Error) => <ErrorFallback error={error} />}>
      {props.children}
    </SolidErrorBoundary>
  );
};

export default ErrorBoundary;
