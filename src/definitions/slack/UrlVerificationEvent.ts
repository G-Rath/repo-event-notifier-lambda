import { EventType } from '@src/definitions/slack';

export interface UrlVerificationEvent {
  /**
   * This deprecated verification token is proof that the request is coming from Slack on behalf of your application.
   * You'll find this value in the "App Credentials" section of your app's application management interface.
   *
   * Verifying this value is more important when working with real events after this verification sequence has been completed.
   * When responding to real events, always use the more secure signing secret process to verify Slack requests' authenticity.
   *
   * @deprecated
   */
  token: string;
  /**
   * a randomly generated string produced by Slack.
   *
   * The point of this little game of cat and mouse is that you're going to respond to this request with a response body containing this value.
   */
  challenge: string;
  /**
   * this payload is similarly formatted to other event types you'll encounter in the Events API.
   * To help you differentiate url verification requests form other event types,
   * we inform you that this is of the url_verification variety.
   */
  type: EventType.UrlVerification;
}
