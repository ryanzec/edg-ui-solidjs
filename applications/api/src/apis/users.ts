import { HttpError } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { DeleteUserRequest, PocketBaseUser } from '$api/types/user';
import type {
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostUserRequest,
  PostUserResponse,
} from '$api/types/user';
import { apiUtils } from '$api/utils/api';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { authenticationUtils } from '$api/utils/authentication';
import { pocketBaseUtils } from '$api/utils/pocketbase';
import type { FastifyInstance } from 'fastify';

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = { Reply: GetUsersResponse };

  api.get<GetUsers>(ApiRoute.USERS, async (request, response) => {
    try {
      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));
      const organizationId = pocketBaseClient.authStore.record?.organizationId;

      if (!organizationId) {
        throw new HttpError(401);
      }

      const users = await pocketBaseClient.collection<PocketBaseUser>('users').getFullList({
        batch: 10,
        filter: `organizationId = "${organizationId}"`,
      });

      request.log.info({
        type: 'get-users',
        users,
      });

      return response.code(200).send(apiUtils.buildDataResponse(users));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type GetUser = {
    Params: {
      userId: GetUserRequest['id'];
    };
    Reply: GetUserResponse;
  };

  api.get<GetUser>(`${ApiRoute.USERS}/:userId`, async (request, response) => {
    try {
      const { userId } = request.params;
      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));
      const user = await pocketBaseClient.collection<PocketBaseUser>('users').getOne(userId);

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type PostUser = {
    Body: PostUserRequest;
    Reply: PostUserResponse;
  };

  api.post<PostUser>(ApiRoute.USERS, async (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.email ||
        !request.body.roles ||
        !request.body.password ||
        !request.body.confirmPassword ||
        !request.body.organizationId
      ) {
        return response.code(400).send();
      }

      const { name, email, roles, password, confirmPassword, organizationId } = request.body;

      request.log.info({
        type: 'create-user',
        createData: {
          name,
          email,
          roles,
          password,
          confirmPassword,
          organizationId,
        },
      });

      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));

      await pocketBaseClient
        .collection('_superusers')
        .authWithPassword(
          applicationConfiguration.pocketbaseAdminUser,
          applicationConfiguration.pocketbaseAdminPassword,
        );

      const user = await pocketBaseClient.collection<PocketBaseUser>('users').create({
        name,
        email,
        roles,
        password,
        passwordConfirm: confirmPassword,
        emailVisibility: true,
        organizationId,
        verified: true,
      });

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type PatchUser = {
    Body: Omit<PatchUserRequest, 'id'>;
    Params: {
      userId: PatchUserRequest['id'];
    };
    Reply: PatchUserResponse;
  };

  api.patch<PatchUser>(`${ApiRoute.USERS}/:userId`, async (request, response) => {
    try {
      const { userId } = request.params;
      const { roles, name, oldPassword, password, confirmPassword } = request.body;
      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));
      const updateData: Record<string, unknown> = {
        roles,
        name,
      };

      if (oldPassword && password && confirmPassword) {
        updateData.oldPassword = oldPassword;
        updateData.password = password;
        updateData.passwordConfirm = confirmPassword;
      }

      const user = await pocketBaseClient.collection<PocketBaseUser>('users').update(userId, updateData);

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });

  type DeleteUser = {
    Params: {
      userId: DeleteUserRequest['id'];
    };
    Reply: DeleteUserResponse;
  };

  api.delete<DeleteUser>(`${ApiRoute.USERS}/:userId`, async (request, response) => {
    try {
      const { userId } = request.params;
      const pocketBaseClient = await pocketBaseUtils.createClient(authenticationUtils.getJwtCookie(request, api));
      const user = await pocketBaseClient.collection<PocketBaseUser>('users').getOne(userId);

      await pocketBaseClient.collection('users').delete(userId);

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });
};
