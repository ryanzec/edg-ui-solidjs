import path from 'node:path';
import * as process from 'node:process';
import url from 'node:url';
import dotenv from 'dotenv';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const requiredEnvironmentVariables = [
  'FRONTEND_URL',
  'API_URL',
  'API_PORT',
  'API_CORS_ORIGIN',
  'API_CORS_METHODS',
  'API_CORS_ALLOWED_HEADERS',
  'LOG_LEVEL',
  'POCKETBASE_URL',
  'POCKETBASE_ADMIN_USER',
  'POCKETBASE_ADMIN_PASSWORD',
  'SESSION_DURATION',
  'COOKIE_SECRET',
];

for (const variable of requiredEnvironmentVariables) {
  if (process.env[variable]) {
    continue;
  }

  // since this might happen before fastify can be created, we need to use javascript's native logger
  console.error(`missing required environment variable '${variable}' so can not start api server`);

  process.exit(1);
}

export interface ApplicationConfiguration {
  frontendUrl: string;
  apiUrl: string;
  apiPort: number;
  nodeEnv: 'development' | 'production';
  logLevel: string;

  // cors
  apiCorsOrigin: string;
  apiCorsMethods: string;
  apiCoreAllowedHeaders: string[];

  // session
  sessionDuration: number;
  cookieSecret: string;

  // development
  globalResponseDelay: number;
  pocketbaseUrl: string;
  pocketbaseAdminUser: string;
  pocketbaseAdminPassword: string;
}

export const applicationConfiguration: ApplicationConfiguration = {
  frontendUrl: process.env.FRONTEND_URL as string,
  apiUrl: process.env.API_URL as string,
  nodeEnv: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  apiPort: Number(process.env.API_PORT),
  logLevel: process.env.LOG_LEVEL as string,

  // cors
  apiCorsOrigin: process.env.API_CORS_ORIGIN as string,
  apiCorsMethods: process.env.API_CORS_METHODS as string,
  apiCoreAllowedHeaders: (process.env.API_CORS_ALLOWED_HEADERS || '').split(','),

  // development
  globalResponseDelay: Number(process.env.GLOBAL_RESPONSE_DELAY || 0),
  pocketbaseUrl: (process.env.POCKETBASE_URL as string) || 'http://localhost:3001',
  pocketbaseAdminUser: process.env.POCKETBASE_ADMIN_USER as string,
  pocketbaseAdminPassword: process.env.POCKETBASE_ADMIN_PASSWORD as string,

  // session
  sessionDuration: Number(process.env.SESSION_DURATION || 1440),
  cookieSecret: process.env.COOKIE_SECRET as string,
};
