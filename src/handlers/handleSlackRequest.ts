import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';
import { EventType, SlackEvent } from '@src/definitions/slack';
import * as HttpStatus from 'http-status-codes';

export const handleSlackRequest = async (request: ApiGatewayRequest): Promise<ApiGatewayResponse> => {
  const slackRequest: SlackEvent = JSON.parse(request.body);

  return {
    statusCode: HttpStatus.OK,
    body: (
      slackRequest.type === EventType.UrlVerification
        ? { challenge: slackRequest.challenge }
        : {}
    )
  };
};
