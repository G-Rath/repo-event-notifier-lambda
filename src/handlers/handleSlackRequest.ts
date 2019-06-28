import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';
import { UnhandleableRequestException } from '@src/exceptions';

export const handleSlackRequest = async (request: ApiGatewayRequest): Promise<ApiGatewayResponse> => {
  throw new UnhandleableRequestException(handleSlackRequest.name, request);
};
