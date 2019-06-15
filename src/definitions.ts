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
  requestContext: object;
  body: string;
  isBase64Encoded: boolean;
}

export interface ApiGatewayResponse {
  statusCode: number;
  body: string | object;
}
