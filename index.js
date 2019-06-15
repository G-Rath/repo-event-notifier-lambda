/**
 * Ensures that the given `Response` has a body of type `string`.
 *
 * @param {ApiGatewayResponse} response
 *
 * @return {ApiGatewayResponse}
 */
const ensureStringBody = response => ({
  ...response,
  body: typeof response.body === 'object'
    ? JSON.stringify(response.body)
    : response.body
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
exports.handler = event => require('./src/index').handler(event).then(ensureStringBody);
