import { motion } from 'framer-motion';
import Image from 'next/image';
import { AutomationLogType, LOG_TYPE } from './interfaces/main';

export function AutomationLogUserDetails(
  props: AutomationLogType,
): JSX.Element {
  return (
    <motion.div
      key={props.id}
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ type: 'spring', duration: 1 }}
      className="AutomationFlow-userDetails-container flex items-center gap-2">
      <Image
        src={props.avatar}
        alt="user-avatar"
        width={80}
        height={80}
        className="AutomationFlow-userDetails-avatar w-6 h-6 rounded-full"
      />
      <p className="text-xs text-neutral-500">
        {props.logType === LOG_TYPE.GITHUB_COMMIT && (
          <>
            Commit pushed by{' '}
            <span className="text-black font-medium">@{props.username}</span>
          </>
        )}
        {props.logType === LOG_TYPE.SLACK_MESSAGE && (
          <>
            Sent by{' '}
            <span className="text-black font-medium">@{props.username}</span>
          </>
        )}
      </p>
    </motion.div>
  );
}
