'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AutomationLog } from './automation-log';
import { AutomationLogUserDetails } from './automation-log-user-details';
import {
  AUTOMATION_LOG_INTERVAL_CHANGE_DELAY,
  AUTOMATION_LOGS,
} from './constants/main';
import { GitHubAutomationCard } from './github-integration-card';
import { SlackAutomationCard } from './slack-integration-card';

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
            <AutomationLogUserDetails {...AUTOMATION_LOGS[logIndex]} />
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
      <div className="AutomationFlow-integrations-container grid grid-cols-2 gap-4 select-none relative">
        <div className="w-[1px] h-[32px] bg-gray-200 absolute -top-[32px] left-[120px]" />
        <div className="w-[1px] h-[32px] bg-gray-200 absolute -top-[32px] right-[130px]" />
        <GitHubAutomationCard currentLog={AUTOMATION_LOGS[logIndex]} />
        <SlackAutomationCard currentLog={AUTOMATION_LOGS[logIndex]} />
      </div>
    </div>
  );
}
