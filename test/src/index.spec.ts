import { handleSlackRequest } from '@src/handlers';
import { handler } from '@src/index';
import { isRequestFromSlack } from '@src/utils';
import { buildApiGatewayRequest } from '@test/factories';
import * as HttpStatus from 'http-status-codes';
import { mocked } from 'ts-jest/utils';

jest.mock('@src/utils/isRequestFromSlack');
jest.mock('@src/handlers/handleSlackRequest');

const mockedIsRequestFromSlack = mocked(isRequestFromSlack);
const mockedHandleSlackRequest = mocked(handleSlackRequest);

describe('index', () => {
  describe('when the request is from slack', () => {
    beforeEach(() => mockedIsRequestFromSlack.mockReturnValue(true));

    it('delegates to handleSlackRequest', async () => {
      const request = buildApiGatewayRequest();

      await handler(request);

      expect(mockedIsRequestFromSlack).toHaveBeenCalledWith(request);
      expect(mockedHandleSlackRequest).toHaveBeenCalledWith(request);
    });
  });

  describe('when the request is not from slack', () => {
    beforeEach(() => mockedIsRequestFromSlack.mockReturnValue(false));

    it('responds w/ a "statusCode" of 404 (NOT_FOUND)', async () => {
      const response = await handler(buildApiGatewayRequest());

      expect(response.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
    });

    it('responds w/ an empty "body"', async () => {
      const response = await handler(buildApiGatewayRequest());

      expect(response.body).toStrictEqual({});
    });
  });
});
