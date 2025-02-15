import type { ResponseStructure } from '$/core/apis/utils';

export type HealthCheckRequest = undefined;
export type HealthCheckResponse = ResponseStructure<{
  status: string;
}>;
