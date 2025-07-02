import type { User, UserRoleName } from '$api/types/user';

const hasRoles = (user: Pick<User, 'roles'>, checkRoles: UserRoleName[]): boolean => {
  for (const checkRole of checkRoles) {
    if (user.roles.includes(checkRole) === false) {
      return false;
    }
  }

  return true;
};

export const userUtils = {
  hasRoles,
};
