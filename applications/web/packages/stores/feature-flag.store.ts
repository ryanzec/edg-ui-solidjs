import * as LDClient from 'launchdarkly-js-client-sdk';
import { type Accessor, createRoot, createSignal } from 'solid-js';
import { applicationConfiguration } from '$/application/utils/application';
import { loggerUtils } from '$/core/utils/logger';

export const FeatureFlag = {
  INTERNAL_TOOLS: 'internal-tools',
  WORK_IN_PROGRESS: 'work-in-progress',
} as const;

export type FeatureFlag = (typeof FeatureFlag)[keyof typeof FeatureFlag];

export type FeatureFlagStore = {
  initialize: (context: LDClient.LDContext, hash: string) => void;
  isInitialized: Accessor<boolean>;
  hasFlag: (flag: FeatureFlag) => boolean;
};

const createFeatureFlagStore = (): FeatureFlagStore => {
  const [isInitialized, setIsInitialized] = createSignal(false);
  const [featureFlags, setFeatureFlags] = createSignal<Record<FeatureFlag, boolean>>({
    [FeatureFlag.INTERNAL_TOOLS]: false,
    [FeatureFlag.WORK_IN_PROGRESS]: false,
  });

  const initialize = (context: LDClient.LDContext, hash: string) => {
    const launchDarklyClient = LDClient.initialize(applicationConfiguration.launchDarklyClientId, context, { hash });

    launchDarklyClient.on('ready', () => {
      loggerUtils.log({
        type: 'launchdarkly-connected',
        wasAlreadyInitialized: isInitialized(),
      });

      const featureFlags = launchDarklyClient.allFlags();

      console.log('featureFlags', featureFlags);

      setFeatureFlags({
        [FeatureFlag.INTERNAL_TOOLS]: featureFlags[FeatureFlag.INTERNAL_TOOLS] ?? false,
        [FeatureFlag.WORK_IN_PROGRESS]: featureFlags[FeatureFlag.WORK_IN_PROGRESS] ?? false,
      });

      setIsInitialized(true);
    });

    launchDarklyClient.on('change', (changes) => {
      const newFeatureflags: Partial<Record<FeatureFlag, boolean>> = {};
      const keys = Object.keys(changes);

      for (const key of keys) {
        newFeatureflags[key as FeatureFlag] = changes[key].current;
      }

      setFeatureFlags({
        ...featureFlags(),
        ...newFeatureflags,
      });
    });

    launchDarklyClient.on('error', (error) => {
      loggerUtils.error({
        type: 'launchdarkly-error',
        error,
      });
    });
  };

  const hasFlag = (flag: FeatureFlag): boolean => {
    return featureFlags()[flag];
  };

  return {
    initialize,
    isInitialized,
    hasFlag,
  };
};

const featureFlagStore = createRoot(createFeatureFlagStore);

export { featureFlagStore };
