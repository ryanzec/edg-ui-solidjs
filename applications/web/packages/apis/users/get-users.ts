import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateTrackedQueryOptions, queryUtils } from '$/utils/query';
import type { GetUsersResponse } from '$api/types/user';
import { QueryKey, applicationConfiguration } from '$web/utils/application';

const getUsersRaw = async (): Promise<GetUsersResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users`, {
    method: HttpMethod.GET,
  });
};

export const getUsers = (queryOptions: Partial<CreateTrackedQueryOptions> = {}) => {
  const usersQuery = queryUtils.createTrackedQuery(() => [QueryKey.GET_USERS_LIST], getUsersRaw, queryOptions);
  const data = () => usersQuery.resource.latest?.data || [];

  return {
    data,
    ...usersQuery,
  };
};
