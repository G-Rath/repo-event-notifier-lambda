declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The signing secret for slack.
     *
     * Used to validate requests claiming to be from slack.
     */
    SLACK_SIGNING_SECRET: string;
  }
}
