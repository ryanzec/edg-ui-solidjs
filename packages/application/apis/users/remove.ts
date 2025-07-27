import type { SolidMutationOptions } from '@tanstack/solid-query';
import { useMutation, useQueryClient } from '@tanstack/solid-query';
import { applicationConfiguration, QueryKey } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { DeleteUserRequest, DeleteUserResponse, GetUsersResponse } from '$api/types/user';

const mutate = async (requestData: DeleteUserRequest): Promise<DeleteUserResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.USERS}/${requestData.id}`, {
    method: HttpMethod.DELETE,
    payload: {},
  });
};

export const remove = (
  mutationOptions: Partial<Omit<SolidMutationOptions<DeleteUserResponse, Error, DeleteUserRequest>, 'mutationFn'>> = {},
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
          if (!oldValue?.data) {
            return oldValue;
          }

          const existingIndex = oldValue.data.findIndex((user) => user.id === mutationResponse.data?.id);

          if (existingIndex === -1) {
            return oldValue;
          }

          const updatedData = [...oldValue.data.slice(0, existingIndex), ...oldValue.data.slice(existingIndex + 1)];

          return {
            ...oldValue,
            data: updatedData,
          };
        });
      },
    };
  });
};
