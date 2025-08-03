import type { FastifyInstance } from 'fastify';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticateRequest,
  AuthenticationAuthenticateResponse,
  AuthenticationCheckRequest,
  AuthenticationCheckResponse,
  AuthenticationLogoutRequest,
  AuthenticationLogoutResponse,
} from '$api/types/authentication';
import type { PocketBaseUser } from '$api/types/user';
import { apiUtils } from '$api/utils/api';
import { authenticationUtils } from '$api/utils/authentication';
import { featureFlagUtils } from '$api/utils/feature-flag';
import { pocketBaseUtils } from '$api/utils/pocketbase';

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type DeleteLogout = {
    Body: AuthenticationLogoutRequest;
    Reply: AuthenticationLogoutResponse;
  };

  api.delete<DeleteLogout>(ApiRoute.AUTHENTICATION_LOGOUT, async (request, response) => {
    try {
      // @todo what do we need to do here?
      authenticationUtils.clearJwtCookie(response);

      return response.status(200).send(apiUtils.buildDataResponse({ status: 'ok' }));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type PostAuthenticate = {
    Body: AuthenticationAuthenticateRequest;
    Reply: AuthenticationAuthenticateResponse;
  };

  api.post<PostAuthenticate>(ApiRoute.AUTHENTICATION_AUTHENTICATE, async (request, response) => {
    try {
      const { email, password } = request.body;

      const pocketBaseClient = await pocketBaseUtils.createClient();
      const authData = await pocketBaseClient.collection<PocketBaseUser>('users').authWithPassword(email, password);

      authenticationUtils.setJwtCookie(response, authData.token);

      return response.status(200).send(
        apiUtils.buildDataResponse({
          user: {
            ...authData.record,
            hasPassword: true,
          },
          launchDarklyHash: featureFlagUtils.generateContextHash({
            user: {
              key: authData.record.id,
            },
            organization: {
              key: authData.record.organizationId,
            },
          }),
        }),
      );
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type GetCheck = {
    Body: AuthenticationCheckRequest;
    Reply: AuthenticationCheckResponse;
  };

  api.get<GetCheck>(ApiRoute.AUTHENTICATION_CHECK, async (request, response) => {
    try {
      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));

      if (pocketBaseClient.authStore.isValid === false) {
        authenticationUtils.clearJwtCookie(response);

        throw new Error('invalid authentication token');
      }

      return response.status(200).send(
        apiUtils.buildDataResponse({
          status: 'ok',
          launchDarklyHash: featureFlagUtils.generateContextHash(request.launchDarklyUser),
        }),
      );
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });
};
