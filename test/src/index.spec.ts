import { handler } from '@src/index';
import { buildApiGatewayRequest } from '@test/factories';
import * as HttpStatus from 'http-status-codes';

describe('index', () => {
  it('responds w/ a "statusCode" of 404 (NOT_FOUND)', async () => {
    const response = await handler(buildApiGatewayRequest());

    expect(response.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
  });

  it('responds /w an empty "body"', async () => {
    const response = await handler(buildApiGatewayRequest());

    expect(response.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
  });
});
