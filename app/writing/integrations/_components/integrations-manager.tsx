'use client';

import { IconPlugConnected, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export function IntegrationManager() {
  const [showConnectionCard, setShowConnectionCard] = useState<boolean>(false);
  const [showRipple, setShowRipple] = useState<boolean>(false);
  const [isSlackConnected, setIsSlackConnected] = useState<boolean>(false);

  const startRippleEffect = () => {
    setShowRipple(true);
    setTimeout(() => {
      setShowRipple(false);
      setIsSlackConnected(true);
    }, 5000);
  };

  return (
    <>
      {!showConnectionCard && (
        <motion.button
          className="p-2 rounded-full bg-bg-white text-gray-500 border absolute bottom-4 right-4"
          onClick={() => setShowConnectionCard(true)}
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}>
          <IconPlugConnected strokeWidth={1.5} />
        </motion.button>
      )}
      {showConnectionCard && (
        <div className="w-full h-full relative">
          <motion.button
            className="p-1 rounded-full bg-bg-white text-gray-500 border absolute bottom-[15.6rem] right-4"
            onClick={() => setShowConnectionCard(false)}
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <IconX strokeWidth={1.5} size={14} />
          </motion.button>
          <motion.div
            key="integrations"
            className="w-72 bg-white border rounded-br-2xl rounded-xl absolute bottom-4 right-4 overflow-hidden divide-y"
            initial={{ opacity: 0, y: 120, x: 64, scale: 0.4 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              type: 'spring',
              bounce: 0.3,
            }}>
            <div className="text-xs py-1 px-2.5 text-gray-500 bg-gray-100">
              Integrations
            </div>
            <div className="p-4 flex items-center justify-between relative overflow-hidden">
              {showRipple && (
                <motion.div
                  className="w-12 h-12 rounded-full bg-emerald-500 blur-2xl absolute top-2 left-2"
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: 12 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    repeatDelay: 0.2,
                  }}></motion.div>
              )}
              <motion.div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/assets/slack-logo.png"
                    alt="slack-logo"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Slack</p>
                  <p className="text-xs text-gray-500">Notifications</p>
                </div>
              </motion.div>
              {!isSlackConnected && !showRipple && (
                <motion.button
                  className="border rounded-lg px-3 py-1 text-xs bg-white hover:bg-gray-50"
                  onClick={() => startRippleEffect()}>
                  Connect
                </motion.button>
              )}
              {isSlackConnected && (
                <motion.p
                  className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}>
                  Connected
                </motion.p>
              )}
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/assets/discord-logo.svg"
                    alt="discord-logo"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Discord</p>
                  <p className="text-xs text-gray-500">Webhooks</p>
                </div>
              </div>
              <motion.button
                className="border rounded-lg px-3 py-1 text-xs bg-white hover:bg-gray-50 disabled:hover:bg-white disabled:opacity-50"
                disabled>
                Connect
              </motion.button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src="/assets/notion-logo.svg"
                    alt="notion-logo"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium">Notion</p>
                  <p className="text-xs text-gray-500">Resources</p>
                </div>
              </div>
              <motion.button
                className="border rounded-lg px-3 py-1 text-xs bg-white hover:bg-gray-50 disabled:hover:bg-white disabled:opacity-50"
                disabled>
                Connect
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
