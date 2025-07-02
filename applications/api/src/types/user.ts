import type { RequestStructure, ResponseStructure } from '$/core/types/api';

export const UserRoleName = {
  ADMIN: 'admin',
  USER: 'user',
};

export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

export const assignableUserRoles = [UserRoleName.ADMIN, UserRoleName.USER];

export type User = {
  id: string;
  name: string;
  email: string;
  roles: UserRoleName[];
  hasPassword: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type PocketBaseUser = User;

export type GetUsersResponse = ResponseStructure<User[]>;

export type GetUserRequest = RequestStructure<Pick<User, 'id'>>;
export type GetUserResponse = ResponseStructure<User>;

export type PostUserRequest = RequestStructure<
  Pick<User, 'name' | 'email'> & {
    roles: string[];
    password: string;
    confirmPassword: string;
  }
>;
export type PostUserResponse = ResponseStructure<User>;

export type PatchUserRequest = RequestStructure<
  Pick<User, 'id'> &
    Partial<
      Pick<User, 'name' | 'email'> & {
        roles: string[];
        oldPassword: string;
        password: string;
        confirmPassword: string;
      }
    >
>;
export type PatchUserResponse = ResponseStructure<User>;

export type DeleteUserRequest = RequestStructure<Pick<User, 'id'>>;
export type DeleteUserResponse = ResponseStructure<User>;
