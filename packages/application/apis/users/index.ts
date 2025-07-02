import { create } from '$/application/apis/users/create';
import { getList } from '$/application/apis/users/get-list';
import { remove } from '$/application/apis/users/remove';
import { update } from '$/application/apis/users/update';

export const usersApi = {
  getList,
  create,
  delete: remove,
  update,
};
