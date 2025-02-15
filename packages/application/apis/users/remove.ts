import { produce } from 'immer';

import { QueryKey, applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/core/utils/query';
import type { DeleteUserRequest, DeleteUserResponse, GetUsersResponse } from '$api/types/user';

const mutate = async (request: DeleteUserRequest): Promise<DeleteUserResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users/${request.id}`, {
    method: HttpMethod.DELETE,
    payload: {},
  });
};

const onSuccess = (mutationResponse: DeleteUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.USERS_GET_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!draft.data) {
          return draft;
        }

        const existingIndex = draft.data.findIndex((user) => user.id === mutationResponse.data?.id);

        if (existingIndex === -1) {
          return draft;
        }

        draft.data.splice(existingIndex, 1);
      });
    },
  );
};

export const remove = (mutationOptions: CreateMutationOptions<DeleteUserRequest, DeleteUserResponse> = {}) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
