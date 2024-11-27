export enum LOG_LABEL {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  REVIEW_REQUESTED = 'REVIEW_REQUESTED',
  AUTOMATED = 'AUTOMATED',
}

export enum LOG_TYPE {
  GITHUB_COMMIT = 'GITHUB_COMMIT',
  SLACK_MESSAGE = 'SLACK_MESSAGE',
}

export type AutomationLogType = {
  id: string;
  username: string;
  avatar: string;
  logType: LOG_TYPE;
  commitMessage?: string;
  slackMessage?: string;
  label?: LOG_LABEL;
  timestampMessage: string;
};
