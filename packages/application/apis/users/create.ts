import { produce } from 'immer';

import { QueryKey, applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/core/utils/query';
import type { GetUsersResponse, PostUserRequest, PostUserResponse } from '$api/types/user';

const mutate = async (request: PostUserRequest): Promise<PostUserResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users`, {
    method: HttpMethod.POST,
    payload: {
      name: request.name,
      email: request.email,
      roles: request.roles,
    },
  });
};

const onSuccess = (mutationResponse: PostUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.USERS_GET_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!mutationResponse.data) {
          return draft;
        }

        draft.data?.unshift(mutationResponse.data);
      });
    },
  );
};

export const create = (mutationOptions: CreateMutationOptions<PostUserRequest, PostUserResponse> = {}) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
