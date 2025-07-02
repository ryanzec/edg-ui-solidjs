import PocketBase from 'pocketbase';
import { applicationConfiguration } from './application-configuration';

export const pocketBaseUtils = {
  createClient: (authToken?: string) => {
    const pocketBaseClient = new PocketBase(applicationConfiguration.pocketbaseUrl);

    if (authToken) {
      pocketBaseClient.authStore.save(authToken);
    }

    return pocketBaseClient;
  },
};
