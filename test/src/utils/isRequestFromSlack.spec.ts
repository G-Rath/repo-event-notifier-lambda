import { ApiGatewayRequest } from '@src/definitions';
import { SlackRequestFailedValidationException } from '@src/exceptions';
import { isRequestFromSlack } from '@src/utils/isRequestFromSlack';
import { buildApiGatewayRequest } from '@test/factories';
import { generateSlackSignatureForRequest } from '@test/helpers';
import { mocked } from 'ts-jest/utils';
import timeSafeCompare from 'tsscmp';

jest.mock('tsscmp');

const mockedTimeSafeCompare = mocked(timeSafeCompare);

const generateSlackTimestamp = () => Math.floor(Date.now() / 1000);

describe('isRequestFromSlack', () => {
  let request: ApiGatewayRequest;

  // return 'true' to ensure other tests are actually failing
  beforeEach(() => mockedTimeSafeCompare.mockReturnValue(true));
  beforeEach(() => process.env.SLACK_SIGNING_SECRET = 'SIGNING_SECRET');
  beforeEach(() => request = buildApiGatewayRequest({ body: JSON.stringify({ hello: 'world' }) }));
  beforeEach(() => request.headers['X-Slack-Request-Timestamp'] = `${generateSlackTimestamp() - 250}`);
  beforeEach(() => request.headers['X-Slack-Signature'] = generateSlackSignatureForRequest(request));

  describe('when "X-Slack-Signature" header is missing', () => {
    beforeEach(() => delete request.headers['X-Slack-Signature']);

    it('returns false', () => {
      expect(isRequestFromSlack(request)).toBe(false);
    });
  });

  describe('when "X-Slack-Request-Timestamp" header is missing', () => {
    beforeEach(() => delete request.headers['X-Slack-Request-Timestamp']);

    it('returns false', () => {
      expect(isRequestFromSlack(request)).toBe(false);
    });
  });

  describe('when both headers are present', () => {
    describe('when the request timestamp is younger than 5 minutes', () => {
      // restore the original implementation of tsscmp for these tests, so that our tests are extra robust
      beforeEach(() => mockedTimeSafeCompare.mockImplementation(jest.requireActual('tsscmp')));

      describe('when comparing the signatures', () => {
        it('does so in a timing safe manner', () => {
          isRequestFromSlack(request);

          expect(mockedTimeSafeCompare).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(String)
          );
        });
      });

      describe('when env holds the correct signing secret', () => {
        beforeEach(() => request.headers['X-Slack-Signature'] = generateSlackSignatureForRequest(request));

        it('returns true', () => {
          expect(isRequestFromSlack(request)).toBe(true);
        });
      });

      describe('when env holds a different signing secret', () => {
        beforeEach(() => request.headers['X-Slack-Signature'] = generateSlackSignatureForRequest(request));
        beforeEach(() => process.env.SLACK_SIGNING_SECRET = `${process.env.SLACK_SIGNING_SECRET}_HAS_CHANGED`);

        it('throws a SlackRequestFailedValidationException', () => {
          expect(() => isRequestFromSlack(request)).toThrow(SlackRequestFailedValidationException);
        });

        // todo: ask someone about whats a good way to structure this test - it technically depends on the above instanceof
        it('fails validation due to hmac', () => {
          try {
            isRequestFromSlack(request);
          } catch (error) {
            expect(error).toHaveProperty('reason', 'hmac');
          }
        });
      });
    });

    describe('when the request timestamp is older than 5 minutes', () => {
      beforeEach(() => request.headers['X-Slack-Request-Timestamp'] = (generateSlackTimestamp() - 500).toString());

      it('throws a SlackRequestFailedValidationException', () => {
        expect(() => isRequestFromSlack(request)).toThrow(SlackRequestFailedValidationException);
      });

      it('fails validation due to timestamp', () => {
        try {
          isRequestFromSlack(request);
        } catch (error) {
          expect(error).toHaveProperty('reason', 'timestamp');
        }
      });
    });
  });
});
