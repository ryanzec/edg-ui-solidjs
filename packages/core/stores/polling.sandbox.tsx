import { createSignal } from 'solid-js';
import { pollingStoreUtils } from '$/core/stores/polling.store';
import Button from '../components/button';

export default {
  title: 'Stores/Polling',
};

export const Default = () => {
  const [pollingCallCount, setPollingCallCount] = createSignal(0);
  const [stopOnNextPolling, setStopOnNextPolling] = createSignal(false);

  const pollingStore = pollingStoreUtils.createStore({
    pollInterval: 500,
    onPoll: async () => {
      setPollingCallCount(pollingCallCount() + 1);

      const currentStopOnNextPolling = stopOnNextPolling();

      if (currentStopOnNextPolling) {
        setStopOnNextPolling(false);
      }

      return currentStopOnNextPolling === false;
    },
  });

  return (
    <div>
      <Button.Group>
        <Button onClick={() => pollingStore.setIsActive(true)}>Start Polling</Button>
        <Button onClick={() => pollingStore.setIsActive(false)}>Stop Polling</Button>
        <Button onClick={() => setStopOnNextPolling(true)}>Stop On Next Polling</Button>
      </Button.Group>
      <div data-id="polling-call-count">Polling call count: {pollingCallCount()}</div>
    </div>
  );
};

export const AutoStart = () => {
  const [pollingCallCount, setPollingCallCount] = createSignal(0);
  const [stopOnNextPolling, setStopOnNextPolling] = createSignal(false);

  const pollingStore = pollingStoreUtils.createStore({
    defaultIsActive: true,
    pollInterval: 500,
    onPoll: async () => {
      setPollingCallCount(pollingCallCount() + 1);

      const currentStopOnNextPolling = stopOnNextPolling();

      if (currentStopOnNextPolling) {
        setStopOnNextPolling(false);
      }

      return currentStopOnNextPolling === false;
    },
  });

  return (
    <div>
      <Button.Group>
        <Button onClick={() => pollingStore.setIsActive(true)}>Start Polling</Button>
        <Button onClick={() => pollingStore.setIsActive(false)}>Stop Polling</Button>
        <Button onClick={() => setStopOnNextPolling(true)}>Stop On Next Polling</Button>
      </Button.Group>
      <div data-id="polling-call-count">Polling call count: {pollingCallCount()}</div>
    </div>
  );
};

export const OnBeforeStartPolling = () => {
  const [pollingCallCount, setPollingCallCount] = createSignal(0);
  const [stopOnNextPolling, setStopOnNextPolling] = createSignal(false);

  const pollingStore = pollingStoreUtils.createStore({
    pollInterval: 500,
    onBeforeStartPolling: async () => {
      if (pollingCallCount() >= 4) {
        return false;
      }

      return true;
    },
    onPoll: async () => {
      setPollingCallCount(pollingCallCount() + 1);

      if (pollingCallCount() >= 4) {
        setStopOnNextPolling(true);

        return false;
      }

      const currentStopOnNextPolling = stopOnNextPolling();

      if (currentStopOnNextPolling) {
        setStopOnNextPolling(false);
      }

      return currentStopOnNextPolling === false;
    },
  });

  return (
    <div>
      <div>Polling auto stops after 4 calls.</div>
      <Button.Group>
        <Button onClick={() => pollingStore.setIsActive(true)}>Start Polling</Button>
        <Button onClick={() => pollingStore.setIsActive(false)}>Stop Polling</Button>
        <Button onClick={() => setStopOnNextPolling(true)}>Stop On Next Polling</Button>
      </Button.Group>
      <div data-id="polling-call-count">Polling call count: {pollingCallCount()}</div>
    </div>
  );
};

export const OnAfterStopPolling = () => {
  const [pollingCallCount, setPollingCallCount] = createSignal(0);
  const [stopOnNextPolling, setStopOnNextPolling] = createSignal(false);

  const pollingStore = pollingStoreUtils.createStore({
    pollInterval: 500,
    onAfterStopPolling: async () => {
      console.log('cleanup after polling stops');
    },
    onPoll: async () => {
      setPollingCallCount(pollingCallCount() + 1);

      const currentStopOnNextPolling = stopOnNextPolling();

      if (currentStopOnNextPolling) {
        setStopOnNextPolling(false);
      }

      return currentStopOnNextPolling === false;
    },
  });

  return (
    <div>
      <div>Polling auto stops after 4 calls.</div>
      <Button.Group>
        <Button onClick={() => pollingStore.setIsActive(true)}>Start Polling</Button>
        <Button onClick={() => pollingStore.setIsActive(false)}>Stop Polling</Button>
        <Button onClick={() => setStopOnNextPolling(true)}>Stop On Next Polling</Button>
      </Button.Group>
      <div data-id="polling-call-count">Polling call count: {pollingCallCount()}</div>
    </div>
  );
};
