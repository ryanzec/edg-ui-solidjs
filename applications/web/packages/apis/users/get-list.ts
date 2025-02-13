import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateTrackedQueryOptions, queryUtils } from '$/utils/query';
import type { GetUsersResponse } from '$api/types/user';
import { QueryKey, applicationConfiguration } from '$web/utils/application';

const getListRaw = async (): Promise<GetUsersResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users`, {
    method: HttpMethod.GET,
  });
};

export const getList = (queryOptions: Partial<CreateTrackedQueryOptions> = {}) => {
  const usersQuery = queryUtils.createTrackedQuery(() => [QueryKey.USERS_GET_LIST], getListRaw, queryOptions);
  const data = () => usersQuery.resource.latest?.data || [];

  return {
    data,
    ...usersQuery,
  };
};
