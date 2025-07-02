import { applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { AuthenticationLogoutResponse } from '$api/types/authentication';

export const logoutRaw = async (): Promise<AuthenticationLogoutResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_LOGOUT}`, {
    method: HttpMethod.DELETE,
    payload: {},
  });
};
