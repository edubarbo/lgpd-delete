import { LRUCache, method, Service } from '@vtex/api';
import { Clients } from './clients';
const TIMEOUT_MS = 800;
// Create a LRU memory cache for the Status client.
// The 'max' parameter sets the size of the cache.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
// Note that the response from the API being called must include an 'etag' header
// or a 'cache-control' header with a 'max-age' value. If neither exist, the response will not be cached.
// To force responses to be cached, consider adding the `forceMaxAge` option to your client methods.
const memoryCache = new LRUCache({ max: 5000 });
metrics.trackCache('status', memoryCache);
// This is the configuration for clients available in `ctx.clients`.
const clients = {
    // We pass our custom implementation of the clients bag, containing the Status client.
    implementation: Clients,
    options: {
        // All IO Clients will be initialized with these options, unless otherwise specified.
        default: {
            retries: 3,
            timeout: TIMEOUT_MS,
            concurrency: 10,
            exponentialTimeoutCoefficient: 2,
            exponentialBackoffCoefficient: 2,
            initialBackoffDelay: 50
        },
        // This key will be merged with the default options and add this cache to our Status client.
        parseAndValidate: {
            memoryCache,
        },
    },
};
// Export a service that defines route handlers and client options.
export default new Service({
    clients,
    routes: { emailDelete: method({
            POST: parseAndValidate,
        }), },
});
