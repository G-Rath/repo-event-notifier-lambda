import { GenericException, UnhandleableRequestException } from '@src/exceptions';

describe('UnhandleableRequestException', () => {
  const processorName = 'createStackedProcessor';
  const request: object = {};

  let exception: UnhandleableRequestException;

  beforeEach(() => exception = new UnhandleableRequestException(processorName, request));

  it('extends GenericException', () => {
    expect(exception).toBeInstanceOf(GenericException);
  });

  it('has the right name', () => {
    expect(exception.name).toBe(UnhandleableRequestException.name);
  });

  it('provides a message', () => {
    expect(exception.message).toMatch(/was given an unhandleable request/i);
  });

  it('names the processor that failed to handle the request', () => {
    expect(exception.message).toContain(processorName);
  });

  it('retains the processorName', () => {
    expect(exception.handler).toStrictEqual(processorName);
  });

  it('retains the request', () => {
    expect(exception.request).toStrictEqual(request);
  });
});
