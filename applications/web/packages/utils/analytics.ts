import posthog, { type PostHogConfig } from 'posthog-js';
import { applicationConfiguration } from '$/application/utils/application';

const productionOptions: Partial<PostHogConfig> = {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  advanced_disable_feature_flags_on_first_load: true,
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
  disable_surveys: true,
  enable_heatmaps: true,
  capture_dead_clicks: false,
};

const developmentOptions: Partial<PostHogConfig> = {
  api_host: 'https://eu.posthog.com',
  person_profiles: 'identified_only',
  advanced_disable_feature_flags_on_first_load: true,
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  disable_session_recording: true,
  disable_surveys: true,
  enable_heatmaps: false,
  capture_dead_clicks: false,
};

const initialize = () => {
  posthog.init(
    applicationConfiguration.posthogPublicKey,
    import.meta.env.MODE !== 'production' ? developmentOptions : productionOptions,
  );

  // global data for all events
  posthog.register({
    env: import.meta.env.MODE !== 'production' ? 'development' : 'production',
  });

  if (typeof window !== 'undefined') {
    window.posthog = posthog;
  }
};

type IdentifyOptions = {
  organizationId: string;
};

const identifyUser = (userId: string, options: IdentifyOptions) => {
  posthog.identify(userId, options);
};

export const analyticsUtils = {
  initialize,
  identifyUser,
};
