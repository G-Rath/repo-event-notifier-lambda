import { ApiGatewayRequest } from '@src/definitions';
import { SlackRequestFailedValidationException } from '@src/exceptions/SlackRequestFailedValidationException';
import * as crypto from 'crypto';
import timeSafeCompare from 'tsscmp';

/**
 * Checks if the given request is from Slack,
 * based on header checks and signature validation.
 *
 * "borrowed" from {@link https://github.com/slackapi/node-slack-sdk/blob/master/packages/events-api/src/http-handler.js#L31 Slack}.
 *
 * It's mainly here to save us installing the entire `@slack/events-api` package.
 *
 * @param {ApiGatewayRequest} request
 *
 * @return {boolean}
 */
export const isRequestFromSlack = (request: ApiGatewayRequest): boolean => {
  const {
    body,
    headers: {
      'X-Slack-Signature': requestSignature,
      'X-Slack-Request-Timestamp': requestTimestamp
    }
  } = request;

  if (!requestSignature || !requestTimestamp) {
    return false;
  }

  // Divide current date to match Slack ts format, & sub 5 minutes from current time
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - (60 * 5);

  if (+requestTimestamp < fiveMinutesAgo) {
    throw new SlackRequestFailedValidationException('timestamp', request);
  }

  const [version, hash] = requestSignature.split('=');
  const digestedHmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET)
                             .update(`${version}:${requestTimestamp}:${body}`)
                             .digest('hex');

  if (!timeSafeCompare(hash, digestedHmac)) {
    throw new SlackRequestFailedValidationException('hmac', request);
  }

  return true;
};
