import { UnhandleableRequestException } from '@src/exceptions';
import { handleSlackRequest } from '@src/handlers';
import { buildApiGatewayRequest } from '@test/factories';

describe('handleSlackRequest', () => {
  describe('when the slack events type is not handleable', () => {
    it('throws an UnhandleableRequestException', async () => {
      await expect(handleSlackRequest(buildApiGatewayRequest())).rejects.toThrow(UnhandleableRequestException);
    });
  });
});
