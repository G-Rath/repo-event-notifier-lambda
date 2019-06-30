import { EventType } from '@src/definitions/slack';

export interface AppRateLimitedEvent {
  /**
   * The same shared token used to verify other events in the Events API
   *
   * @deprecated
   */
  token: string;
  /**
   * This specific event type, `app_rate_limited`
   */
  type: EventType.AppRateLimited;
  /**
   * A rounded epoch time value indicating the minute your application became rate limited for this workspace.
   *
   * @example `1518467820` is at 2018-02-12 20:37:00 UTC.
   */
  minute_rate_limited: number;
  /**
   * Subscriptions between your app and the workspace with this ID are being rate limited.
   */
  team_id: string;
  /**
   * Your application's ID, especially useful if you have multiple applications working with the Events API.
   */
  api_app_id: string;
}
