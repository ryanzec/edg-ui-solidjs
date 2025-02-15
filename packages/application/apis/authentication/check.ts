import { applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { AuthenticationCheckResponse } from '$api/types/authentication';

export const checkRaw = async (): Promise<AuthenticationCheckResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_CHECK}`, {
    method: HttpMethod.GET,
  });
};

// this method is only needed as a one-off so no need to export a query based version
