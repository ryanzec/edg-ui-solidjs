import { applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/core/utils/query';
import { ApiRoute } from '$api/types/api';
import type { AuthenticationLogoutRequest, AuthenticationLogoutResponse } from '$api/types/authentication';

const mutate = async (): Promise<AuthenticationLogoutResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_LOGOUT}`, {
    method: HttpMethod.DELETE,
    payload: {},
  });
};

export const logout = (
  mutateOptions: CreateMutationOptions<AuthenticationLogoutRequest, AuthenticationLogoutResponse> = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
