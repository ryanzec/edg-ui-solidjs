import type { RequestStructure, ResponseStructure } from '$/core/types/api';
import type { User } from '$api/types/user';

export type AuthenticationAuthenticateRequest = RequestStructure<{
  email: string;
  password: string;
}>;
export type AuthenticationAuthenticateResponse = ResponseStructure<{
  user: User;
  launchDarklyHash: string;
}>;

export type AuthenticationCheckRequest = undefined;
export type AuthenticationCheckResponse = ResponseStructure<{
  status: string;
  launchDarklyHash: string;
}>;

export type AuthenticationLogoutRequest = undefined;
export type AuthenticationLogoutResponse = ResponseStructure<{
  status: string;
}>;
