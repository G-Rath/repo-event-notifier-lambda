import { ApiGatewayRequest } from '@src/definitions';
import { GenericException } from '@src/exceptions';

export type ValidationFailureReason = 'hmac' | 'timestamp';

/**
 * Exception that represents when a request that seems to have come from Slack fails validation.
 *
 * @extends {GenericException}
 */
export class SlackRequestFailedValidationException extends GenericException {
  private readonly _request: ApiGatewayRequest;
  private readonly _reason: ValidationFailureReason;

  /**
   * Constructs a new `SlackRequestFailedValidationException`.
   *
   * @param {'hmac'|'timestamp'} reason the reason that request failed validation.
   * @param {ApiGatewayRequest} request the request that couldn't be handled by the throwing handler.
   */
  public constructor(reason: ValidationFailureReason, request: ApiGatewayRequest) {
    super(`slack request failed ${reason} validation`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SlackRequestFailedValidationException);
    }

    this._reason = reason;
    this._request = request;
  }

  //#region getters & setters
  public get reason(): string {
    return this._reason;
  }

  public get request(): object {
    return this._request;
  }

  //#endregion
}
