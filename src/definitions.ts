export type StringMap = Record<string, string>;

export interface ApiGatewayRequest {
  resource: string;
  path: string;
  httpMethod: string;
  headers: StringMap;
  multiValueHeaders: Record<string, string[]>;
  multiValueQueryStringParameters: Record<string, string[]> | null;
  queryStringParameters: StringMap | null;
  pathParameters: StringMap | null;
  stageVariables: StringMap | null;
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
