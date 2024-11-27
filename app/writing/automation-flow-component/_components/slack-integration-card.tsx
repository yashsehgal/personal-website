import { motion, useAnimate } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { AutomationLogType, LOG_TYPE } from './interfaces/main';

export function SlackAutomationCard({
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
    <div className="SlackAutomationCard-wrapper p-1 rounded-xl border relative">
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
