// biome-ignore lint/correctness/noUnusedImports: this is needed for the modification to the session object interface
import type { FastifyRequest } from 'fastify';
import type { LaunchDarklyContext } from '$api/types/feature-flag';

declare module 'fastify' {
  interface FastifyRequest {
    newJwt: string;
    launchDarklyUser: LaunchDarklyContext;
  }
}
