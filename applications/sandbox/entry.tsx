import '$/core/types/solid-js';

import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';

import '@fontsource/geist-mono/400.css';
import '@fontsource/geist-mono/500.css';
import '@fontsource/geist-mono/600.css';
import '@fontsource/geist-mono/700.css';

import '@phosphor-icons/web/regular/style.css';
import '@phosphor-icons/web/bold/style.css';
import '@phosphor-icons/web/fill/style.css';

import '$sandbox/styles/tailwind.css';
import '$/core/styles/animation.css';
import '$/core/styles/keyframes.css';
import '$/core/styles/base.css';

import { dateUtils } from '$/core/utils/date';
import { render } from 'solid-js/web';

import Application from '$sandbox/components/application';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

dateUtils.configureTimezone('UTC');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetch on window focus might have adverse effects so we disable it by default and enable it on a per-query
      // basis
      refetchOnWindowFocus: false,

      // generally retry will not result in a different outcome, so we disable it by default and enable it on a
      // per-query basis
      retry: 0,

      // caching can be tricky so we disabled it by default and enable it on a per-query basis as needed
      staleTime: 0,
      gcTime: 0,
    },
  },
});

type HMRData = {
  appDisposer?: () => void;
};

// this is used to avoid duplication ui in the hot reload functionality
let HMRData: HMRData = {};

if (import.meta.hot) {
  HMRData = import.meta.hot.data;
}

const start = async () => {
  HMRData.appDisposer?.();

  HMRData.appDisposer = render(
    () => (
      <QueryClientProvider client={queryClient}>
        <Application.Router />
      </QueryClientProvider>
    ),
    document.getElementById('application-mount') as HTMLElement,
  );
};

if (import.meta.hot) {
  import.meta.hot.accept();
}

start();
