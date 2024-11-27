import { motion } from 'framer-motion';
import { AutomationLogLabel } from './automation-log-label';
import { GitHubLogo } from './gihtub-logo';
import { AutomationLogType, LOG_LABEL, LOG_TYPE } from './interfaces/main';
import { SlackLogo } from './slack-logo';

export function AutomationLog(props: AutomationLogType): JSX.Element {
  return (
    <div className="AutomationLog-container flex items-center gap-0.5 select-none">
      <motion.div
        className="AutomationLog-platformLogo-wrapper"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring' }}>
        {props.logType === LOG_TYPE.SLACK_MESSAGE && <SlackLogo />}
        {props.logType === LOG_TYPE.GITHUB_COMMIT && <GitHubLogo />}
      </motion.div>
      <motion.div
        className="AutomationLog-logMessage-wrapper"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', delay: 0.1 }}>
        {props.logType === LOG_TYPE.GITHUB_COMMIT && (
          <p className="Automationlog-logMessage--githubMessage text-xs">
            {props.commitMessage}
          </p>
        )}
        {props.logType && (
          <p className="Automationlog-logMessage--slackMessage text-xs">
            {props.slackMessage}
          </p>
        )}
      </motion.div>
      <motion.div
        className="AutomationLog-logMessage-label ml-auto"
        initial={{ opacity: 0, filter: 'blur(2px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ type: 'spring', delay: 0.3 }}>
        {props.label === LOG_LABEL.AUTOMATED && (
          <AutomationLogLabel className="rounded">Automated</AutomationLogLabel>
        )}
        {props.label === LOG_LABEL.BACKEND && (
          <AutomationLogLabel className="bg-orange-100 text-orange-500">
            Backend
          </AutomationLogLabel>
        )}
        {props.label === LOG_LABEL.FRONTEND && (
          <AutomationLogLabel className="bg-teal-100 text-teal-600">
            Frontend
          </AutomationLogLabel>
        )}
        {props.label === LOG_LABEL.REVIEW_REQUESTED && (
          <AutomationLogLabel className="bg-indigo-100 text-indigo-500">
            Requested review
          </AutomationLogLabel>
        )}
      </motion.div>
    </div>
  );
}
