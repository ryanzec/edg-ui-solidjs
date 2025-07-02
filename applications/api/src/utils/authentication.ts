import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { applicationConfiguration } from './application-configuration';

const setJwtCookie = (response: FastifyReply, jwt: string) => {
  response.setCookie('jwt', jwt, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: (applicationConfiguration.sessionDuration || 0) * 1000,
    signed: true,
  });
};

const getJwtCookie = (request: FastifyRequest, api: FastifyInstance) => {
  if (request.newJwt) {
    return request.newJwt;
  }

  const unsignedCookie = api.unsignCookie(request.cookies.jwt || '');

  return unsignedCookie.valid ? unsignedCookie.value : '';
};

const clearJwtCookie = (response: FastifyReply) => {
  response.clearCookie('jwt', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0,
    signed: true,
  });
};

export const authenticationUtils = {
  setJwtCookie,
  getJwtCookie,
  clearJwtCookie,
};
