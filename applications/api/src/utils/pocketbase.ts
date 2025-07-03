import PocketBase from 'pocketbase';
import { applicationConfiguration } from './application-configuration';

export const pocketBaseUtils = {
  createClient: async (authToken?: string) => {
    const pocketBaseClient = new PocketBase(applicationConfiguration.pocketbaseUrl);

    if (authToken) {
      pocketBaseClient.authStore.save(authToken);
    }

    // this ensure the user is available in the authStore
    if (pocketBaseClient.authStore.isValid) {
      await pocketBaseClient.collection('users').authRefresh();
    }

    return pocketBaseClient;
  },
};
