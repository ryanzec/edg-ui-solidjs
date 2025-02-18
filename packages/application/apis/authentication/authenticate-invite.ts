import { applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticateInviteRequest,
  AuthenticationAuthenticateInviteResponse,
} from '$api/types/authentication';

export const authenticateInviteRaw = async (
  request: AuthenticationAuthenticateInviteRequest,
): Promise<AuthenticationAuthenticateInviteResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_AUTHENTICATE_INVITE}`, {
    method: HttpMethod.POST,
    payload: request,
  });
};

// this method is only needed as a one-off so no need to export a query based version
