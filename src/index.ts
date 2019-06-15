import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';
import * as HttpStatus from 'http-status-codes';

export const handler = async (request: ApiGatewayRequest): Promise<ApiGatewayResponse> => {
  return {
    statusCode: HttpStatus.NOT_FOUND,
    body: {}
  };
};
