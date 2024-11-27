import { AutomationLogType, LOG_LABEL, LOG_TYPE } from '../interfaces/main';

export const AUTOMATION_LOG_INTERVAL_CHANGE_DELAY: number = 4000 as const;

export const AUTOMATION_LOGS: readonly AutomationLogType[] = [
  {
    id: '3v534',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: 'feat: add flow for profile management',
    label: LOG_LABEL.FRONTEND,
    timestampMessage: '3 min ago',
  },
  {
    id: '4v345',
    username: 'rightfitso',
    avatar: 'https://github.com/rightfitso.png',
    logType: LOG_TYPE.SLACK_MESSAGE,
    slackMessage: 'Added reviews for the profile flow',
    timestampMessage: '3 min ago',
  },
  {
    id: '5vr34',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: 'fix: custom profile view and components',
    timestampMessage: '2 min ago',
  },
  {
    id: '5fr34',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: 'feat: setup zod and backend',
    label: LOG_LABEL.BACKEND,
    timestampMessage: '2 min ago',
  },
  {
    id: '6v32d',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: 'chore: remove unused imports and code quality checks',
    label: LOG_LABEL.REVIEW_REQUESTED,
    timestampMessage: '2 min ago',
  },
  {
    id: '7vr31',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.SLACK_MESSAGE,
    slackMessage:
      'Hey @rightfitso! Just updated the flow + added code improvements',
    timestampMessage: '1 min ago',
  },
  {
    id: '8v3dd',
    username: 'rightfitso',
    avatar: 'https://github.com/rightfitso.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: '[automated]: running code code quality checks',
    timestampMessage: '1 min ago',
  },
  {
    id: '9vrrt',
    username: 'rightfitso',
    avatar: 'https://github.com/rightfitso.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage: '[automated]: deploying and running checks',
    label: LOG_LABEL.AUTOMATED,
    timestampMessage: '1 min ago',
  },
  {
    id: '0er34',
    username: 'rightfitso',
    avatar: 'https://github.com/rightfitso.png',
    logType: LOG_TYPE.SLACK_MESSAGE,
    slackMessage: 'Deployed on production successfully!',
    label: LOG_LABEL.AUTOMATED,
    timestampMessage: '30 seconds ago',
  },
  {
    id: '1erg4',
    username: 'yashsehgal',
    avatar: 'https://github.com/yashsehgal.png',
    logType: LOG_TYPE.GITHUB_COMMIT,
    commitMessage:
      'Hi @eng-team, deployment is done successfully! Good work 🎉',
    label: LOG_LABEL.AUTOMATED,
    timestampMessage: 'Just now',
  },
] as const;
