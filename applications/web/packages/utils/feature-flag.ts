import posthog from 'posthog-js';

export const FeatureFlag = {
  INTERNAL_TOOLS: 'internal-tools',
  WORK_IN_PROGRESS: 'work-in-progress',
} as const;

export type FeatureFlag = (typeof FeatureFlag)[keyof typeof FeatureFlag];

const hasFeatureFlag = (flag: FeatureFlag): boolean => {
  const isEnabled = posthog.isFeatureEnabled(flag);

  if (!isEnabled) {
    return false;
  }

  return true;
};

export const featureFlagUtils = {
  hasFeatureFlag,
};
