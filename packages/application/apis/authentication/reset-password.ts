import { applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/core/utils/query';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationResetPasswordRequest,
  AuthenticationResetPasswordResponse,
} from '$api/types/authentication';

const mutate = async (request: AuthenticationResetPasswordRequest): Promise<AuthenticationResetPasswordResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_RESET_PASSWORD}`, {
    method: HttpMethod.POST,
    payload: request,
  });
};

export const resetPassword = (
  mutateOptions: CreateMutationOptions<AuthenticationResetPasswordRequest, AuthenticationResetPasswordResponse> = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
