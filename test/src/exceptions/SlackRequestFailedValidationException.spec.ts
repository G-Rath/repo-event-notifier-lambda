import { ApiGatewayRequest } from '@src/definitions';
import { GenericException, SlackRequestFailedValidationException } from '@src/exceptions';
import { ValidationFailureReason } from '@src/exceptions/SlackRequestFailedValidationException';
import { buildApiGatewayRequest } from '@test/factories';

describe('SlackRequestFailedValidationException', () => {
  const request: ApiGatewayRequest = buildApiGatewayRequest();
  const failureReason: ValidationFailureReason = 'hmac';

  let exception: SlackRequestFailedValidationException;

  beforeEach(() => exception = new SlackRequestFailedValidationException(failureReason, request));

  it('extends GenericException', () => {
    expect(exception).toBeInstanceOf(GenericException);
  });

  it('has the right name', () => {
    expect(exception.name).toBe(SlackRequestFailedValidationException.name);
  });

  it('provides a nice message', () => {
    expect(exception.message).toMatch(/slack request failed .*? validation/i);
  });

  it('names the reason the request failed validation', () => {
    expect(exception.message).toContain(failureReason);
  });

  it('retains the reason validation failed', () => {
    expect(exception.reason).toStrictEqual(failureReason);
  });

  it('retains the request that failed validation', () => {
    expect(exception.request).toStrictEqual(request);
  });
});
