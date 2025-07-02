import type { ResponseStructure } from '$/core/types/api';

export type HealthCheckRequest = undefined;
export type HealthCheckResponse = ResponseStructure<{
  status: string;
}>;
