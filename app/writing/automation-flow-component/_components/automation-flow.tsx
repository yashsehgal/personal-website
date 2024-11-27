'use client';
import { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/helpers';

const AUTOMATION_LOG_INTERVAL_CHANGE_DELAY: number = 4000 as const;

enum LOG_LABEL {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  REVIEW_REQUESTED = 'REVIEW_REQUESTED',
  AUTOMATED = 'AUTOMATED',
}

enum LOG_TYPE {
  GITHUB_COMMIT = 'GITHUB_COMMIT',
  SLACK_MESSAGE = 'SLACK_MESSAGE',
}

type AutomationLogType = {
  id: string;
  username: string;
  avatar: string;
  logType: LOG_TYPE;
  commitMessage?: string;
  slackMessage?: string;
  label?: LOG_LABEL;
  timestampMessage: string;
};

const AUTOMATION_LOGS: readonly AutomationLogType[] = [
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

export function AutomationFlow(): JSX.Element {
  const [logIndex, setLogIndex] = useState<number>(0);

  useEffect(() => {
    const automationLogInterval = setInterval(() => {
      if (logIndex !== AUTOMATION_LOGS.length - 1) {
        setLogIndex((currentLogIndex) => currentLogIndex + 1);
      } else {
        // Resetting to index 0 to restart the automation logging flow
        setLogIndex(0);
      }
    }, AUTOMATION_LOG_INTERVAL_CHANGE_DELAY);

    return () => clearInterval(automationLogInterval);
  }, [logIndex]);

  return (
    <div className="AutomationFlow-container font-sans space-y-8">
      <div className="AutomationFlow-logs-container p-1 rounded-xl border w-[520px]">
        <div className="AutomationFlow-logsCard-container bg-white rounded-lg drop-shadow">
          <div className="AutomationFlow-logsCard-topSection-container p-2.5 border-b">
            <AutomationLog key={logIndex} {...AUTOMATION_LOGS[logIndex]} />
          </div>
          <div className="AutomationFlow-logsCard-bottomSection-container p-4 select-none flex items-center justify-between">
            <motion.div
              key={AUTOMATION_LOGS[logIndex].id}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ type: 'spring', duration: 1 }}
              className="AutomationFlow-userDetails-container flex items-center gap-2">
              <Image
                src={AUTOMATION_LOGS[logIndex].avatar}
                alt="user-avatar"
                width={80}
                height={80}
                className="AutomationFlow-userDetails-avatar w-6 h-6 rounded-full"
              />
              <p className="text-xs text-neutral-500">
                {AUTOMATION_LOGS[logIndex].logType ===
                  LOG_TYPE.GITHUB_COMMIT && (
                  <>
                    Commit pushed by{' '}
                    <span className="text-black font-medium">
                      @{AUTOMATION_LOGS[logIndex].username}
                    </span>
                  </>
                )}
                {AUTOMATION_LOGS[logIndex].logType ===
                  LOG_TYPE.SLACK_MESSAGE && (
                  <>
                    Sent by{' '}
                    <span className="text-black font-medium">
                      @{AUTOMATION_LOGS[logIndex].username}
                    </span>
                  </>
                )}
              </p>
            </motion.div>
            <motion.p
              key={logIndex}
              className="AutomationFlow-timestamp text-xs text-neutral-500"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ type: 'spring', duration: 1 }}>
              {AUTOMATION_LOGS[logIndex].timestampMessage}
            </motion.p>
          </div>
        </div>
      </div>
      <div className="AutomationFlow-integrations-container grid grid-cols-2 gap-4 select-none">
        <GitHubAutomationCard currentLog={AUTOMATION_LOGS[logIndex]} />
        <SlackAutomationCard currentLog={AUTOMATION_LOGS[logIndex]} />
      </div>
    </div>
  );
}

function GitHubAutomationCard({
  currentLog,
}: {
  currentLog: AutomationLogType;
}): JSX.Element {
  const [scope, animate] = useAnimate();

  const runScaleAnimation = async () => {
    // Reset to initial state
    await animate(scope.current, { scale: 0 }, { duration: 0 });
    // Run the scale up animation
    await animate(scope.current, { scale: 24 }, { duration: 2 });
  };

  useEffect(() => {
    if (currentLog.logType === LOG_TYPE.GITHUB_COMMIT) {
      runScaleAnimation();
    }
  }, [currentLog]);

  return (
    <div className="GitHubAutomationCard-wrapper p-1 rounded-xl border">
      <motion.div className="GitHubAutomationCard relative bg-white drop-shadow rounded-lg p-4 flex items-center gap-3 overflow-hidden">
        {currentLog.logType === LOG_TYPE.GITHUB_COMMIT && (
          <motion.div
            key={currentLog.id}
            ref={scope}
            className="absolute top-4 w-[120px] h-[120px] border-[8px] border-teal-400 blur-[24px]"
            initial={{ scale: 0 }}
          />
        )}
        <Image
          className="GitHubAutomationCard-logo w-8 h-8"
          src="/assets/github-logo.png"
          alt="github-logo"
          width={120}
          height={120}
        />
        <div className="GitHubAutomationCard-details-container space-y-0.5">
          <p className="text-sm font-medium">GitHub Integration</p>
          <p className="text-xs text-neutral-500">Connected to #github-org</p>
        </div>
      </motion.div>
    </div>
  );
}

function SlackAutomationCard({
  currentLog,
}: {
  currentLog: AutomationLogType;
}): JSX.Element {
  const [scope, animate] = useAnimate();

  const runScaleAnimation = async () => {
    // Reset to initial state
    await animate(scope.current, { scale: 0 }, { duration: 0 });
    // Run the scale up animation
    await animate(scope.current, { scale: 24 }, { duration: 2 });
  };

  useEffect(() => {
    if (currentLog.logType === LOG_TYPE.SLACK_MESSAGE) {
      runScaleAnimation();
    }
  }, [currentLog]);

  return (
    <div className="SlackAutomationCard-wrapper p-1 rounded-xl border">
      <motion.div className="SlackAutomationCard relative bg-white drop-shadow rounded-lg p-4 flex items-center gap-3 overflow-hidden">
        {currentLog.logType === LOG_TYPE.SLACK_MESSAGE && (
          <motion.div
            key={currentLog.id}
            ref={scope}
            className="absolute top-4 w-[120px] h-[120px] border-[8px] border-purple-400 blur-[24px]"
            initial={{ scale: 0 }}
          />
        )}
        <Image
          className="SlackAutomationCard-logo w-8 h-8"
          src="/assets/slack-logo.png"
          alt="slack-logo"
          width={120}
          height={120}
        />
        <div className="SlackAutomationCard-details-container space-y-0.5">
          <p className="text-sm font-medium">Slack Integration</p>
          <p className="text-xs text-neutral-500">Subscribed to github/org</p>
        </div>
      </motion.div>
    </div>
  );
}

function AutomationLog(props: AutomationLogType): JSX.Element {
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

function AutomationLogLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn(
        'AutomationLogLabel text-xs font-medium px-2 flex items-center justify-center py-0.5 rounded-full shrink-0 bg-neutral-100 text-neutral-500',
        className,
      )}
      {...props}
    />
  );
}

function SlackLogo(): JSX.Element {
  return (
    <div className="p-2 rounded-full bg-white w-8 h-8">
      <Image
        src="/assets/slack-logo.png"
        alt="slack-logo"
        className="w-full h-full"
        width={80}
        height={80}
      />
    </div>
  );
}

function GitHubLogo(): JSX.Element {
  return (
    <div className="p-2 rounded-full bg-white w-8 h-8">
      <Image
        src="/assets/github-logo.png"
        alt="github-logo"
        className="w-full h-full"
        width={80}
        height={80}
      />
    </div>
  );
}
