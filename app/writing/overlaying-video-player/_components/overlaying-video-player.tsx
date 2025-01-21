'use client';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const VIDEO_URL: string =
  'https://www.youtube.com/embed/XTp5jaRU3Ws?si=14X0ZrChPQ5ZnGjd&amp;controls=0' as const;

enum VIDEO_PLAYER_STATE {
  PAUSED = 'video:paused',
  PLAYING = 'video:playing',
}

enum VIDEO_CONTROLS {
  SHOW = 'controls:show',
  HIDE = 'controls:hide',
}

interface VideoConfig {
  player: VIDEO_PLAYER_STATE;
  controls: VIDEO_CONTROLS;
}

const VIDEO_PLAYER_LOAD_CONFIG: VideoConfig = {
  player: VIDEO_PLAYER_STATE.PAUSED,
  controls: VIDEO_CONTROLS.HIDE,
} as const;

export function OverlayingVideoPlayer() {
  const [videoConfig, setVideoConfig] = useState<VideoConfig>(
    VIDEO_PLAYER_LOAD_CONFIG,
  );

  const [interacting, setInteracting] = useState<boolean>(false);
  const [videoTimestamp, setVideoTimestamp] = useState<number>(40);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-64 h-36 bg-blue-600 rounded-2xl shadow-2xl overflow-hidden relative"
        drag={!interacting}
        draggable={!interacting}
        dragElastic={0.4}
        dragMomentum
        dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}>
        <div
          className="absolute w-full h-full top-0 left-0 z-[20] select-all hover:bg-black/20 transition-colors"
          onMouseEnter={() =>
            setVideoConfig({
              ...videoConfig,
              controls: VIDEO_CONTROLS.SHOW,
            })
          }
          onMouseLeave={() =>
            setVideoConfig({
              ...videoConfig,
              controls: VIDEO_CONTROLS.HIDE,
            })
          }>
          {videoConfig.controls === VIDEO_CONTROLS.SHOW && (
            <>
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/15 rounded-full"
                onMouseDown={(e) => {
                  setInteracting(true);
                }}
                onMouseUp={() => {
                  setInteracting(false);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setTimeout(() => {
                    if (interacting) setInteracting(false);
                  }, 20);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setInteracting(false);
                  if (videoConfig.player === VIDEO_PLAYER_STATE.PAUSED) {
                    setVideoConfig({
                      ...videoConfig,
                      player: VIDEO_PLAYER_STATE.PLAYING,
                    });
                  } else {
                    setVideoConfig({
                      ...videoConfig,
                      player: VIDEO_PLAYER_STATE.PAUSED,
                    });
                  }
                }}>
                {videoConfig.player === VIDEO_PLAYER_STATE.PLAYING && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}>
                    <IconPlayerPauseFilled size={32} strokeWidth={2} />
                  </motion.div>
                )}
                {videoConfig.player === VIDEO_PLAYER_STATE.PAUSED && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}>
                    <IconPlayerPlayFilled size={32} strokeWidth={2} />
                  </motion.div>
                )}
              </button>
              <motion.div
                onMouseDown={(e) => {
                  setInteracting(true);
                }}
                onMouseUp={() => {
                  setInteracting(false);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setTimeout(() => {
                    if (interacting) setInteracting(false);
                  }, 20);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ height: `10px` }}
                className="rounded-full overflow-hidden bg-white/20 h-1.5 w-[90%] absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="bg-white h-full"
                  style={{ width: `${videoTimestamp}%` }}
                />
              </motion.div>
            </>
          )}
        </div>
        {videoConfig.player === VIDEO_PLAYER_STATE.PLAYING && (
          <>
            <motion.div
              className="w-12 h-12 rounded-full bg-white/20 blur-lg absolute top-12 left-12"
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 12 }}
              transition={{
                repeat: Infinity,
                duration: 3,
                repeatDelay: 0.4,
              }}
            />
            <motion.div
              className="w-12 h-12 rounded-full bg-white/20 blur-lg absolute top-20 right-12"
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 12 }}
              transition={{
                repeat: Infinity,
                duration: 4,
                repeatDelay: 1,
                delay: 0.6,
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
