import { AppRateLimitedEvent } from '@src/definitions/slack/AppRateLimitedEvent';
import { UrlVerificationEvent } from '@src/definitions/slack/UrlVerificationEvent';

export type SlackEvent =
  | AppRateLimitedEvent
  | UrlVerificationEvent
  ;
