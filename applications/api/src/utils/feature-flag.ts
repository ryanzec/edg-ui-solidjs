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

type KeyGenerationData = {
  user: Pick<LaunchDarklyContext['user'], 'key'>;
  organization: Pick<LaunchDarklyContext['organization'], 'key'>;
};

const generateContextKey = (data: KeyGenerationData) => {
  return `organization:${data.organization.key}:user:${data.user.key}`;
};

const generateContextHash = (data: KeyGenerationData) => {
  const contextKey = generateContextKey(data);

  return crypto.createHmac('sha256', applicationConfiguration.launchDarklySdkKey).update(contextKey).digest('hex');
};

export const featureFlagUtils = { hasFlag, generateContextHash };
