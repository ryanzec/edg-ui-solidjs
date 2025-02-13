import { create } from '$web/apis/users/create';
import { getList } from '$web/apis/users/get-list';
import { remove } from '$web/apis/users/remove';
import { update } from '$web/apis/users/update';

export const usersApi = {
  getList,
  create,
  remove,
  update,
};
