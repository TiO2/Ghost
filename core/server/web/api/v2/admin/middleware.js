const auth = require('../../../../services/auth');
const shared = require('../../../shared');

/**
 * Authentication for private endpoints
 */
module.exports.authenticatePrivate = [
    shared.middlewares.api.cors,
    shared.middlewares.urlRedirects.adminRedirect,
    shared.middlewares.prettyUrls
    auth.authenticate.authenticateAdminApiKey,
    auth.authorize.requiresAuthorizedUserOrApiKey,
];

/**
 * Authentication for client endpoints
 */
module.exports.authenticateClient = function authenticateClient(client) {
    return [
        auth.authenticate.authenticateClient,
        auth.authenticate.authenticateUser,
        auth.authorize.requiresAuthorizedClient(client),
        shared.middlewares.api.cors,
        shared.middlewares.urlRedirects.adminRedirect,
        shared.middlewares.prettyUrls
    ];
};
