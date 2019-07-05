import { ApiGatewayRequest, ApiGatewayResponse } from '@src/definitions';

interface RequestHandler {
  /**
   * Checks if this `RequestHandler` can handle the given `request`.
   *
   * This is where things like signature verification checks should be done.
   *
   * @param {ApiGatewayRequest} request
   *
   * @return {boolean}
   */
  canHandle: (request: ApiGatewayRequest) => boolean;

  /**
   * Handles the given `request`.
   *
   * This should only be called if `canHandle` returns `true` for the given `request`,
   * and assumes as much, throwing in the events of errors.
   *
   * @param {ApiGatewayRequest} request
   *
   * @return {Promise<ApiGatewayResponse>}
   */
  handle: (request: ApiGatewayRequest) => Promise<ApiGatewayResponse>;
}
