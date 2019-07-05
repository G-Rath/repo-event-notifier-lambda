import { ApiGatewayRequest } from '@src/definitions';
import { SlackEvent, UrlVerificationEvent } from '@src/definitions/slack';
import { handleSlackRequest } from '@src/handlers';
import { buildApiGatewayRequest, buildSlackAppRateLimitedEvent, buildSlackUrlVerificationEvent } from '@test/factories';
import * as HttpStatus from 'http-status-codes';

const buildSlackRequest = (slackEvent: SlackEvent): ApiGatewayRequest => buildApiGatewayRequest({
  body: JSON.stringify(slackEvent)
});

describe('handleSlackRequest', () => {
  describe('when the event type is "url_verification"', () => {
    let slackEvent: UrlVerificationEvent;

    beforeEach(() => slackEvent = buildSlackUrlVerificationEvent());

    it('returns w/ a "statusCode" of 200 (OK)', async () => {
      const response = await handleSlackRequest(buildSlackRequest(slackEvent));

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('returns the challenge in the body', async () => {
      const response = await handleSlackRequest(buildSlackRequest(slackEvent));

      expect(response.body).toHaveProperty('challenge', slackEvent.challenge);
    });
  });
  describe('when the event type is not "url_verification"', () => {
    let slackEvent: SlackEvent/* & not UrlVerificationEvent */;

    beforeEach(() => slackEvent = buildSlackAppRateLimitedEvent());

    it('returns w/ a "statusCode" of 200 (OK)', async () => {
      const response = await handleSlackRequest(buildSlackRequest(slackEvent));

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('returns w/ an empty "body"', async () => {
      const response = await handleSlackRequest(buildSlackRequest(slackEvent));

      expect(response.body).toStrictEqual({});
    });
  });
});
