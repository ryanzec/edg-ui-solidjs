import fs from 'node:fs';
import path from 'node:path';
import * as process from 'node:process';
import url from 'node:url';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify from 'fastify';
import { emailUtils } from '$/core/utils/email';
import { registerAuthenticateApi } from '$api/apis/authenticate';
import { registerHealthApi } from '$api/apis/health';
import { registerUsersApi } from '$api/apis/users';
import { delayerHook } from '$api/middleware/delayer';
import { mockerrorHook } from '$api/middleware/mockerror';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { authenticationUtils } from '$api/utils/authentication';
import { featureFlagUtils } from '$api/utils/feature-flag';
import { loggerUtils } from '$api/utils/logger';
import { pocketBaseUtils } from '$api/utils/pocketbase';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const api = fastify({
  logger: loggerUtils.loggerConfiguration,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-cert.pem')),
  },
});

loggerUtils.setLogger(api.log);

await api.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = applicationConfiguration.apiCorsOrigin.split(',');

    if (!origin) {
      return callback(null, true);
    }

    const isAllowed = allowedOrigins.some((allowed) => {
      return allowed === origin;
    });

    callback(null, isAllowed);
  },
  methods: applicationConfiguration.apiCorsMethods,
  allowedHeaders: applicationConfiguration.apiCoreAllowedHeaders,
  optionsSuccessStatus: 200,
  credentials: true,
});

api.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
});

if (process.env.NODE_ENV === 'development') {
  api.addHook('preHandler', delayerHook);
}

api.addHook('preHandler', mockerrorHook);

// is pocketbase supported it we should refresh the token here but leave it as this for now
api.addHook('preHandler', async (request, response) => {
  const jwt = authenticationUtils.getJwtCookie(request, api);

  if (!jwt) {
    return;
  }

  const pocketBaseClient = await pocketBaseUtils.createClient(jwt);

  if (pocketBaseClient.authStore.isValid === false) {
    authenticationUtils.clearJwtCookie(response);

    throw new Error('invalid authentication token');
  }

  request.launchDarklyUser = {
    kind: 'multi',
    user: {
      key: pocketBaseClient.authStore.record?.id ?? '',
      emailDomain: emailUtils.getDomain(pocketBaseClient.authStore.record?.email ?? ''),
    },
    organization: {
      key: pocketBaseClient.authStore.record?.organizationId ?? '',
    },
  };
});

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);

// start the server
const start = async () => {
  try {
    api.listen({ port: applicationConfiguration.apiPort });
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};

start();
