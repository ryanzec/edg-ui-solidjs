import { applicationConfiguration } from '$/application/utils/application';
import posthog from 'posthog-js';

const initialize = () => {
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

  if (typeof window !== 'undefined') {
    window.posthog = posthog;
  }
};

type IdentifyOptions = {
  organizationId: string;
};

const identifyUser = (userId: string, options: IdentifyOptions) => {
  const userProperties: Record<string, unknown> = {
    userId,
  };

  if (options.organizationId) {
    userProperties.organizationId = options.organizationId;
  }

  posthog.identify(userId, userProperties);
};

export const analyticsUtils = {
  initialize,
  identifyUser,
};
