import { useQuery } from '@tanstack/solid-query';
import type { QueryOptionsType, QueryResultTuple } from '$/application/apis/utils';
import { applicationConfiguration, QueryKey } from '$/application/utils/application';
import { HttpMethod, httpUtils } from '$/core/utils/http';
import { ApiRoute } from '$api/types/api';
import type { GetUsersResponse } from '$api/types/user';

const getListRaw = async (): Promise<GetUsersResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.USERS}`, {
    method: HttpMethod.GET,
  });
};

export const getList = (
  queryOptions: QueryOptionsType<GetUsersResponse, [typeof QueryKey.USERS_GET_LIST]> = {},
): QueryResultTuple<GetUsersResponse, GetUsersResponse['data']> => {
  const query = useQuery(() => ({
    queryKey: [QueryKey.USERS_GET_LIST],
    queryFn: getListRaw,
    ...queryOptions,
  }));

  return [query, () => query.data?.data];
};
