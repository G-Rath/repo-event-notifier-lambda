/**
 * Base class for all generic exceptions and errors.
 *
 * If it's usually possible to recover from an error, then it's an Exception, otherwise;
 * If it's not usually possible to recover from an error, then it's an Error.
 *
 * This class is named as an Exception optimistically,
 * as it's favourable to recover whenever possible.
 */
export class GenericException extends Error {
  protected readonly _timestamp = new Date();

  /**
   * Constructs a new `GenericException`, with the given `message`.
   *
   * @param {string} message a string describing the error that occurred
   */
  public constructor(message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GenericException);
    }
  }

  //#region getters & setters
  /**
   * The name of this exception.
   *
   * @return {string}
   * @instance
   */
  public get name() {
    return this.constructor.name;
  }

  /**
   * The `Date` that this `GenericException` was created.
   *
   * Typically this is the `Date` it was thrown.
   *
   * @return {Date}
   */
  public get timestamp() {
    return this._timestamp;
  }

  //#endregion
}
