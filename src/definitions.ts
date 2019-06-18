export type StringMap = Record<string, string>;

export interface ApiGatewayRequest {
  resource: string;
  path: string;
  httpMethod: string;
  headers: StringMap;
  multiValueHeaders: Record<string, string[]>;
  queryStringParameters: StringMap;
  pathParameters: StringMap;
  stageVariables: StringMap;
  requestContext: ApiGatewayRequestContext;
  body: string;
  isBase64Encoded: boolean;
}

export interface ApiGatewayRequestContext {
  resourceId: string;
  resourcePath: string;
  httpMethod: string;
  extendedRequestId: string;
  requestTime: string;
  path: string;
  accountId: string;
  protocol: string;
  stage?: string;
  domainPrefix: string;
  requestTimeEpoch: number;
  requestId: string;
  identity?: unknown;
  domainName: string;
  apiId: string;
}

export interface ApiGatewayResponse {
  statusCode: number;
  body: string | object;
}
