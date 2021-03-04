import { RedisCache } from 'apollo-server-cache-redis';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { EnvService } from '~modules/core/env.service';
import { getDataSources } from '~modules/data-sources/data-sources';
import { registerEnum } from './gql.enum';
import { schemaDirectives } from './gql.directives';

const envService = new EnvService();

const context = ({ req }) => ({request: req});
const debug = envService.get('ENABLE_DEBUG') == 'true' ? true : false;
const playground = envService.get('ENABLE_PLAYGROUND') == 'true' ? true : false;
const tracing = envService.get('ENABLE_TRACING') == 'true' ? true : false;
const cache = new RedisCache({
    port: Number(envService.get('REDIS_PORT', 6379)),
    host: envService.get('REDIS_HOST', 'localhost'),
    password: envService.get('REDIS_PASSWORD', null)
});

registerEnum();

export const config = {
    context,
    dataSources: getDataSources(envService),
    autoSchemaFile: 'schema.gql',
    debug,
    playground,
    tracing,
    plugins: [responseCachePlugin()],
    cache,
    // cacheControl: true,
    schemaDirectives,
};