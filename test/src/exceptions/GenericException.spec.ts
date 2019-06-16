import { GenericException } from '@src/exceptions';

describe('GenericException', () => {
  const message = 'Danger, Will Robinson!';
  let exception: GenericException;

  beforeEach(() => exception = new GenericException(message));

  it('extends Error', () => {
    expect(exception).toBeInstanceOf(Error);
  });

  it('has the right name', () => {
    expect(exception.name).toBe(GenericException.name);
  });

  it('provides a message', () => {
    expect(exception.message).toBe(message);
  });

  it('provides a timestamp', () => {
    expect(exception.timestamp).toBeInstanceOf(Date);
  });
});
