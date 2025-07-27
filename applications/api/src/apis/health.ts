import type { FastifyInstance } from 'fastify';
import { ApiRoute } from '$api/types/api';
import type { HealthCheckRequest, HealthCheckResponse } from '$api/types/health';
import { apiUtils } from '$api/utils/api';

export const registerHealthApi = (api: FastifyInstance) => {
  type GetHealth = {
    Body: HealthCheckRequest;
    Reply: HealthCheckResponse;
  };

  api.get<GetHealth>(ApiRoute.HEALTH, async (_request_, response) => {
    try {
      return response.status(200).send(apiUtils.buildDataResponse({ status: 'ok' }));
    } catch (error: unknown) {
      return response.status(apiUtils.getErrorStatusCode(error)).send(apiUtils.buildErrorResponse(error));
    }
  });
};
