/* @refresh reload */
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

import '$/core/styles/variables.css';
import '$/core/styles/animation.css';
import '$/core/styles/keyframes.css';
import '$/core/styles/base.css';

import { applicationConfiguration } from '$/application/utils/application';
import { dateUtils } from '$/core/utils/date';
import posthog from 'posthog-js';
import { render } from 'solid-js/web';

import Application from '$web/components/application';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

dateUtils.configureTimezone('UTC');

posthog.init(applicationConfiguration.posthogPublicKey, {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
  disable_surveys: true,
  enable_heatmaps: true,
  capture_dead_clicks: false,
});

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

const start = async () => {
  render(
    () => (
      <QueryClientProvider client={queryClient}>
        <Application.Router />
      </QueryClientProvider>
    ),
    document.getElementById('application-mount') as HTMLElement,
  );
};

start();
