import { buildApiGatewayRequest } from '@test/factories';
import { generateSlackSignatureForRequest } from '@test/helpers/generateSlackSignatureForRequest';
import * as crypto from 'crypto';
import { mocked } from 'ts-jest/utils';

jest.mock('crypto');

const actualCrypto = jest.requireActual('crypto');
const mockedCrypto = mocked(crypto);

describe('generateSlackSignatureForRequest', () => {
  const secret = 'secret';

  // we actually just want to spy on createHmac, but have to use mock due to es6
  beforeEach(() => mockedCrypto.createHmac.mockImplementation(actualCrypto.createHmac));

  describe('when generating the signature', () => {
    it('uses crypto.createHmac', () => {
      generateSlackSignatureForRequest(buildApiGatewayRequest(), secret);

      expect(mockedCrypto.createHmac).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String)
      );
    });

    it('uses the sha256 algorithm', () => {
      generateSlackSignatureForRequest(buildApiGatewayRequest(), secret);

      expect(mockedCrypto.createHmac).toHaveBeenCalledWith(
        'sha256',
        expect.any(String)
      );
    });

    it('uses the secret as the key', () => {
      generateSlackSignatureForRequest(buildApiGatewayRequest(), secret);

      expect(mockedCrypto.createHmac).toHaveBeenCalledWith(
        expect.any(String),
        secret
      );
    });

    describe('when no secret is provided', () => {
      beforeEach(() => process.env.SLACK_SIGNING_SECRET = secret);

      it('uses process.env.SLACK_SIGNING_SECRET', () => {
        generateSlackSignatureForRequest(buildApiGatewayRequest(), undefined);

        expect(mockedCrypto.createHmac).toHaveBeenCalledWith(
          expect.any(String),
          secret
        );
      });
    });
  });

  // todo: maybe write tests about the signature splitting on "=" and starting w/ v0?
  // todo: maybe write tests using pre-computed examples?
});
