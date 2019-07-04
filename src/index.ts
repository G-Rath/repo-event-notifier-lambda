import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';
import { handleSlackRequest } from '@src/handlers';
import { isRequestFromSlack } from '@src/utils';
import * as HttpStatus from 'http-status-codes';

export const handler = async (request: ApiGatewayRequest): Promise<ApiGatewayResponse> => {
  if (isRequestFromSlack(request)) {
    return handleSlackRequest(request);
  }

  return {
    statusCode: HttpStatus.NOT_FOUND,
    body: {}
  };
};
