import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { applicationConfiguration } from '$api/utils/application-configuration';

export const delayerHook = (_request: FastifyRequest, _response: FastifyReply, done: HookHandlerDoneFunction) => {
  setTimeout(done, applicationConfiguration.globalResponseDelay);
};
