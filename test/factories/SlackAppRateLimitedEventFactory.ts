import { AppRateLimitedEvent, EventType } from '@src/definitions/slack';
import { makeFactory } from 'factory.ts';

export const SlackAppRateLimitedEventFactory = makeFactory<AppRateLimitedEvent>({
  token: 'token',
  type: EventType.AppRateLimited,
  /* eslint-disable @typescript-eslint/camelcase */
  api_app_id: 'app-1',
  minute_rate_limited: 5,
  team_id: 'team-1'
  /* eslint-enable @typescript-eslint/camelcase */
});

export const buildSlackAppRateLimitedEvent = SlackAppRateLimitedEventFactory.build.bind(SlackAppRateLimitedEventFactory);
