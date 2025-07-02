import { authenticateRaw } from '$/application/apis/authentication/authenticate';
import { checkRaw } from '$/application/apis/authentication/check';
import { logoutRaw } from '$/application/apis/authentication/logout';

export const authenticationApi = {
  logoutRaw,
  checkRaw,
  authenticateRaw,
};
