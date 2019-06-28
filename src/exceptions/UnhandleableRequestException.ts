import { GenericException } from '@src/exceptions';

/**
 * Exception that represents when a {@link RequestHandler `RequestHandler`} is unable to handle a given request.
 *
 * @extends {GenericException}
 */
export class UnhandleableRequestException extends GenericException {
  private readonly _handler: string;
  private readonly _request: object;

  /**
   * Constructs a new `UnhandleableRequestException`.
   *
   * @param {string} handler the name of the `RequestHandler` that failed to handle the given `request`
   * @param {Object} request the request that couldn't be handled by the throwing handler.
   */
  public constructor(handler: string, request: object) {
    super(`${handler} was given an unhandleable request`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnhandleableRequestException);
    }

    this._handler = handler;
    this._request = request;
  }

  //#region getters & setters
  public get request(): object {
    return this._request;
  }

  public get handler(): string {
    return this._handler;
  }

  //#endregion
}
