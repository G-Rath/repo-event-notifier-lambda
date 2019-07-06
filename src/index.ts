import * as Sentry from '@sentry/node';
import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';
import { handleSlackRequest } from '@src/handlers';
import { isRequestFromSlack } from '@src/utils';
import * as HttpStatus from 'http-status-codes';

Sentry.init({ dsn: process.env.SENTRY_DNS, maxValueLength: 1000 });

export const handler = async (request: ApiGatewayRequest): Promise<ApiGatewayResponse> => {
  try {
    if (isRequestFromSlack(request)) {
      return handleSlackRequest(request);
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  return {
    statusCode: HttpStatus.NOT_FOUND,
    body: {}
  };
};
