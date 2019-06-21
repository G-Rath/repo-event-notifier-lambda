export type StringMap = Record<string, string | undefined>;

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

// body:
// '{"token":"93fTY14e1V48e47aL87F6Kta","team_id":"T025T9LHG","api_app_id":"AH9FX64G7","event":{"type":"message","subtype":"message_changed","hidden":true,"message":{"client_msg_id":"0a6ba8de-fba7-446d-aaec-a320d6eb2954","type":"message","text":"review
// please:
// <https:\\/\\/bitbucket.org\\/preferizi\\/theraces-react\\/pull-requests\\/70\\/add-code-for-google-tags-manager\\/diff>","user":"UEJSTE4JU","edited":{"user":"UEJSTE4JU","ts":"1560308802.000000"},"ts":"1560304286.009100"},"channel":"CDMBDU06S","previous_message":{"client_msg_id":"0a6ba8de-fba7-446d-aaec-a320d6eb2954","type":"message","text":"review
// please:
// <https:\\/\\/bitbucket.org\\/preferizi\\/theraces-react\\/pull-requests\\/70\\/add-code-for-google-tags-manager\\/diff>","user":"UEJSTE4JU","ts":"1560304286.009100"},"event_ts":"1560308802.010400","ts":"1560308802.010400","channel_type":"channel"},"type":"event_callback","event_id":"EvKFT2DDT6","event_time":1560308802,"authed_users":["UEJSTE4JU"]}',
