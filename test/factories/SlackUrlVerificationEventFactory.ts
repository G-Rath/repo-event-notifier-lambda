import { EventType, UrlVerificationEvent } from '@src/definitions/slack';
import { makeFactory } from 'factory.ts';

export const SlackUrlVerificationEventFactory = makeFactory<UrlVerificationEvent>({
  token: 'token',
  type: EventType.UrlVerification,
  challenge: 'challenge'
});

export const buildSlackUrlVerificationEvent = SlackUrlVerificationEventFactory.build.bind(SlackUrlVerificationEventFactory);
