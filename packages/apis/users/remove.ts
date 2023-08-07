import _remove from 'lodash/remove';

import { GetUsersListReturns } from '$/apis/users/get-users';
import { User, UserIdentifier } from '$/data-models/user';
import { applicationUtils, GlobalVariable, QueryKey } from '$/utils/application';
import { HttpMethod, httpUtils } from '$/utils/http';
import { CreateMutationOptions, queryUtils } from '$/utils/query';

export interface RemoveUserReturns {
  user: User;
}

export const mutate = async (input: UserIdentifier): Promise<RemoveUserReturns> => {
  return await httpUtils.http(`${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users/${input.id}`, {
    method: HttpMethod.DELETE,
  });
};

export const onSuccess = (mutationResponse: RemoveUserReturns) => {
  // @todo(!!!) convert to use immer
  queryUtils.triggerMutator<GetUsersListReturns>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      const newData = { users: [...oldValue.users] };

      _remove(newData.users, { id: mutationResponse.user.id });

      return newData;
    },
  );
};

export const remove = (mutationOptions: CreateMutationOptions<UserIdentifier, RemoveUserReturns>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
