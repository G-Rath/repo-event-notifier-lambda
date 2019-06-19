import { ApiGatewayRequest } from '@src/definitions';
import { buildApiGatewayRequestContext } from '@test/factories';
import { makeFactory } from 'factory.ts';

export const ApiGatewayRequestFactory = makeFactory<ApiGatewayRequest>({
  resource: '/ren-y',
  path: '/ren-y',
  httpMethod: 'POST',
  headers: {
    /*
    'Accept': '*!/!*',
    'Accept-Encoding': 'gzip,deflate',
    'Content-Type': 'application/json',
    'Host': '4rqawkgo70.execute-api.ap-southeast-2.amazonaws.com',
    'User-Agent': 'Slackbot 1.0 (+https://api.slack.com/robots)',
    'X-Amzn-Trace-Id': 'Root=1-5d006c43-452b301603f20ad4b78b6cca',
    'X-Forwarded-For': '34.207.89.78',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
    'X-Slack-Request-Timestamp': '1560308803',
    'X-Slack-Signature': 'v0=08ab847ea7b35e0d15b871ec6189e62d95983c2860e8052d91a0e2dcda5140cc'
    */
  },
  multiValueHeaders: {
    /*
    'Accept': [
      '*!/!*'
    ],
    'Accept-Encoding': [
      'gzip,deflate'
    ],
    'Content-Type': [
      'application/json'
    ],
    'Host': [
      '4rqawkgo70.execute-api.ap-southeast-2.amazonaws.com'
    ],
    'User-Agent': [
      'Slackbot 1.0 (+https://api.slack.com/robots)'
    ],
    'X-Amzn-Trace-Id': [
      'Root=1-5d006c43-452b301603f20ad4b78b6cca'
    ],
    'X-Forwarded-For': [
      '34.207.89.78'
    ],
    'X-Forwarded-Port': [
      '443'
    ],
    'X-Forwarded-Proto': [
      'https'
    ],
    'X-Slack-Request-Timestamp': [
      '1560308803'
    ],
    'X-Slack-Signature': [
      'v0=08ab847ea7b35e0d15b871ec6189e62d95983c2860e8052d91a0e2dcda5140cc'
    ]
    */
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: buildApiGatewayRequestContext(),
  body: '{}',
  isBase64Encoded: false
});

export const buildApiGatewayRequest = ApiGatewayRequestFactory.build.bind(ApiGatewayRequestFactory);
