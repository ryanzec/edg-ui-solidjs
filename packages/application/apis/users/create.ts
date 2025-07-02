import { QueryKey, applicationConfiguration } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { GetUsersResponse, PostUserRequest, PostUserResponse } from '$api/types/user';
import type { SolidMutationOptions } from '@tanstack/solid-query';
import { useMutation, useQueryClient } from '@tanstack/solid-query';

const mutate = async (requestData: PostUserRequest): Promise<PostUserResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.USERS}`, {
    method: HttpMethod.POST,
    payload: requestData,
  });
};

export const create = (
  mutationOptions: Partial<Omit<SolidMutationOptions<PostUserResponse, Error, PostUserRequest>, 'mutationFn'>> = {},
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

          return {
            ...oldValue,
            data: [mutationResponse.data, ...oldValue.data],
          };
        });
      },
    };
  });
};
