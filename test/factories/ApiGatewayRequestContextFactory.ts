import { ApiGatewayRequestContext } from '@src/definitions';
import { makeFactory } from 'factory.ts';

export const ApiGatewayRequestContextFactory = makeFactory<ApiGatewayRequestContext>({
  resourceId: '8sj1kx',
  resourcePath: '/bitbucket-watcher',
  httpMethod: 'POST',
  extendedRequestId: 'bJXanEJnSwMFf5w=',
  requestTime: '12/Jun/2019:03:06:43 +0000',
  path: '/default/bitbucket-watcher',
  accountId: '645208916693',
  protocol: 'HTTP/1.1',
  stage: 'default',
  domainPrefix: '4rqawkgo70',
  requestTimeEpoch: 1560308803974,
  requestId: '1b8342b1-8cbf-11e9-8001-9f27f43c1043',
  identity: {
    /*
    cognitoIdentityPoolId: null,
    accountId: null,
    cognitoIdentityId: null,
    caller: null,
    sourceIp: '34.207.89.78',
    principalOrgId: null,
    accessKey: null,
    cognitoAuthenticationType: null,
    cognitoAuthenticationProvider: null,
    userArn: null,
    userAgent: 'Slackbot 1.0 (+https://api.slack.com/robots)',
    user: null
    */
  },
  domainName: '4rqawkgo70.execute-api.ap-southeast-2.amazonaws.com',
  apiId: '4rqawkgo70'
});

export const buildApiGatewayRequestContext = ApiGatewayRequestContextFactory.build.bind(ApiGatewayRequestContextFactory);
