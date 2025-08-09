import * as crypto from 'crypto';
import LaunchDarkly from 'launchdarkly-node-server-sdk';
import type { LaunchDarklyContext } from '$api/types/feature-flag';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { globalLogger } from '$api/utils/logger';

let isInitialized = false;

const launchDarklyClient = LaunchDarkly.init(applicationConfiguration.launchDarklySdkKey, {
  timeout: 5,
});

launchDarklyClient.on('ready', () => {
  globalLogger?.info({
    type: 'launchdarkly-initialized',
    wasAlreadyInitialized: isInitialized,
  });
});

launchDarklyClient.on('error', (error) => {
  globalLogger?.error({
    type: 'launchdarkly-error',
    error,
  });
});

try {
  await launchDarklyClient.waitForInitialization();
  isInitialized = true;
} catch (error) {
  globalLogger?.error('Failed to initialize LaunchDarkly client', error);
}

process.on('SIGTERM', async () => {
  launchDarklyClient.close();

  process.exit(0);
});

// biome-ignore lint/suspicious/noExplicitAny: feature flag values can be any so need any here
const hasFlag = (flag: string, user: LaunchDarklyContext, defaultValue: any = false) => {
  if (!isInitialized) {
    return false;
  }

  return launchDarklyClient.variation(flag, user, defaultValue);
};

const generateContextKey = (userKey: string, organizationKey: string) => {
  return `organization:${organizationKey}:user:${userKey}`;
};

// this is required by launch darkly secure mode which ensures that no one can generate new contexts since they will
// need the server side sdk key to generate the hash
const generateContextHash = (userKey: string, organizationKey: string) => {
  const contextKey = generateContextKey(userKey, organizationKey);

  return crypto.createHmac('sha256', applicationConfiguration.launchDarklySdkKey).update(contextKey).digest('hex');
};

export const featureFlagUtils = { hasFlag, generateContextHash };
