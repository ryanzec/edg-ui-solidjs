import { type Accessor, createEffect, createSignal, onCleanup, untrack } from 'solid-js';

const DEFAULT_POLL_INTERVAL = 3000;

export type PollingStore = {
  isActive: Accessor<boolean>;
  setIsActive: (isActive: boolean) => void;
};

export type CreatePollingStoreOptions = {
  defaultIsActive?: boolean;
  pollInterval?: number;
  // returns true if the polling should start, false if it should not
  onBeforeStartPolling?: () => Promise<boolean>;
  onAfterStopPolling?: () => Promise<void>;
  // returns true if the polling should continue, false if it should stop
  onPoll: () => Promise<boolean>;
};

const createPollingStore = (options: CreatePollingStoreOptions): PollingStore => {
  let pollingTimeoutId: number | undefined;

  const [isActive, setIsActive] = createSignal(options.defaultIsActive || false);

  const clearCurrentPolling = () => {
    if (pollingTimeoutId !== undefined) {
      return;
    }

    window.clearTimeout(pollingTimeoutId);
    pollingTimeoutId = undefined;
  };

  const startPolling = async () => {
    clearCurrentPolling();

    const currentIsActive = isActive();

    if (currentIsActive === false) {
      await untrack(async () => await options.onAfterStopPolling?.());

      return;
    }

    // depending on what the onPoll function does,
    const shouldContinue = await untrack(async () => await options.onPoll());

    if (shouldContinue === false) {
      setIsActive(false);

      await untrack(async () => await options.onAfterStopPolling?.());

      return;
    }

    pollingTimeoutId = window.setTimeout(startPolling, options.pollInterval || DEFAULT_POLL_INTERVAL);
  };

  createEffect(async () => {
    const currentIsActive = isActive();

    if (currentIsActive === false) {
      return;
    }

    const shouldStart = await untrack(async () =>
      options.onBeforeStartPolling ? await options.onBeforeStartPolling() : true,
    );

    if (shouldStart === false) {
      setIsActive(false);

      return;
    }

    startPolling();
  });

  onCleanup(() => {
    clearCurrentPolling();
  });

  return {
    isActive,
    setIsActive,
  };
};

export const pollingStoreUtils = {
  createStore: createPollingStore,
};
