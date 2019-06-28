import { ApiGatewayRequest } from '@src/definitions';
import * as crypto from 'crypto';

/**
 * Creates a Slack request signature from the given parameters.
 *
 * @param {string} signingSecret the secret to use to sign the request
 * @param {string} ts the timestamp of the request
 * @param {string} rawBody the raw body of the request
 * @param {string} [requestSigningVersion='v0'] the signature version to generate
 *
 * @return {string}
 */
const generateSlackRequestSignature = (
  signingSecret: string,
  ts: string,
  rawBody: string,
  requestSigningVersion = 'v0'
) => {
  const digestedHmac = crypto.createHmac('sha256', signingSecret)
                             .update(`${requestSigningVersion}:${ts}:${rawBody}`)
                             .digest('hex');

  return `${requestSigningVersion}=${digestedHmac}`;
};

/**
 * Generates the `X-Slack-Signature` for the given request using the
 * timestamp stored in the `X-Slack-Request-Timestamp` header of the request,
 * the requests body, and the given `signingSecret`.
 *
 * If `signingSecret` is not provided, the `SLACK_SIGNING_SECRET` env value is used.
 *
 * @param {ApiGatewayRequest} request
 * @param {string} [signingSecret=process.env.SLACK_SIGNING_SECRET]
 *
 * @return {string}
 */
export const generateSlackSignatureForRequest = (
  request: ApiGatewayRequest,
  signingSecret = process.env.SLACK_SIGNING_SECRET
) => generateSlackRequestSignature(
  signingSecret,
  request.headers['X-Slack-Request-Timestamp']!,
  request.body
);
