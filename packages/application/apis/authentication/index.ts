import { authenticateRaw } from '$/application/apis/authentication/authenticate';
import { authenticateInviteRaw } from '$/application/apis/authentication/authenticate-invite';
import { checkRaw } from '$/application/apis/authentication/check';
import { logout } from '$/application/apis/authentication/logout';
import { resetPassword } from '$/application/apis/authentication/reset-password';
import { sendResetPassword } from '$/application/apis/authentication/send-reset-password';

export const authenticationApi = {
  logout,
  checkRaw,
  sendResetPassword,
  resetPassword,
  authenticateRaw,
  authenticateInviteRaw,
};
