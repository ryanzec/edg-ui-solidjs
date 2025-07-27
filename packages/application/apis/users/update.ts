import type { SolidMutationOptions } from '@tanstack/solid-query';
import { useMutation, useQueryClient } from '@tanstack/solid-query';
import { applicationConfiguration, QueryKey } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { GetUsersResponse, PatchUserRequest, PatchUserResponse } from '$api/types/user';

const mutate = async (requestData: PatchUserRequest): Promise<PatchUserResponse> => {
  const { id, ...payload } = requestData;

  if (!id) {
    throw new Error('id is required for updating a user');
  }

  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.USERS}/${id}`, {
    method: HttpMethod.PATCH,
    payload,
  });
};

export const update = (
  mutationOptions: Partial<Omit<SolidMutationOptions<PatchUserResponse, Error, PatchUserRequest>, 'mutationFn'>> = {},
) => {
  const queryClient = useQueryClient();

  return useMutation(() => {
    const { onSuccess, ...restMutationOptions } = mutationOptions;

    return {
      ...restMutationOptions,
      mutationFn: mutate,
      onSuccess: (mutationResponse, variables, context) => {
        if (onSuccess) {
          onSuccess(mutationResponse, variables, context);
        }

        queryClient.setQueryData<GetUsersResponse>([QueryKey.USERS_GET_LIST], (oldValue) => {
          if (!oldValue?.data || !mutationResponse.data) {
            if (!mutationResponse.data) {
              // @todo(logging) this should never happen so we should log it if it does
            }

            return oldValue;
          }

          const existingIndex = oldValue.data.findIndex((user) => user.id === mutationResponse.data?.id);

          if (existingIndex === -1) {
            return oldValue;
          }

          const updatedData = [
            ...oldValue.data.slice(0, existingIndex),
            mutationResponse.data,
            ...oldValue.data.slice(existingIndex + 1),
          ];

          return {
            ...oldValue,
            data: updatedData,
          };
        });
      },
    };
  });
};
