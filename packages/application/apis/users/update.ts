import { produce } from 'immer';

import { QueryKey, applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/core/utils/query';
import type { GetUsersResponse, PatchUserRequest, PatchUserResponse } from '$api/types/user';

const mutate = async ({ id, ...payload }: PatchUserRequest): Promise<PatchUserResponse> => {
  if (!id) {
    throw new Error('id is required for updating a user');
  }

  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users/${id}`, {
    method: HttpMethod.PATCH,
    payload,
  });
};

const onSuccess = (mutationResponse: PatchUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.USERS_GET_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!mutationResponse.data) {
          // @todo(logging) should never happen but should log just in case
          return draft;
        }

        const existingIndex = draft.data?.findIndex((user) => user.id === mutationResponse.data?.id);

        if (existingIndex === undefined || existingIndex === -1) {
          return draft;
        }

        draft.data?.splice(existingIndex, 1, mutationResponse.data);
      });
    },
  );
};

export const update = (mutationOptions: CreateMutationOptions<PatchUserRequest, PatchUserResponse> = {}) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
