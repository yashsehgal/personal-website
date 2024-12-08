'use client';
import { cn } from '@/helpers';
import {
  useState,
  useEffect,
  MouseEvent,
  FocusEventHandler,
  FocusEvent,
} from 'react';
import { motion, MotionProps } from 'framer-motion';
import { IconGripVertical } from '@tabler/icons-react';

interface LayerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  length: number;
  name: string;
}

enum LAYER_UI_STATE {
  IDLE = 'IDLE',
  SELECTED = 'SELECTED',
}

const LAYERS_INITIAL_CONFIG = [
  { length: 40, name: 'CTA' },
  { length: 30, name: 'Headline' },
  { length: 20, name: 'Description' },
  { length: 60, name: 'Tagline' },
  { length: 50, name: 'Main product' },
  { length: 20, name: 'Terms and condition' },
  { length: 12, name: 'Price' },
] as const;

export function LayersContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('LayersContainer grid gap-2 w-[80%] font-sans', className)}
      {...props}>
      {LAYERS_INITIAL_CONFIG.map((layer, index) => {
        return <Layer key={index} length={layer.length} name={layer.name} />;
      })}
    </div>
  );
}

function Layer({ className, length, name, ...props }: LayerProps): JSX.Element {
  const [LayerUIState, setLayerUIState] = useState<LAYER_UI_STATE>(
    LAYER_UI_STATE.IDLE,
  );

  const handleLayerSelection = (e: FocusEvent<HTMLButtonElement>) => {
    setLayerUIState(LAYER_UI_STATE.SELECTED);
  };

  const handleLayerDeselection = (e: FocusEvent<HTMLButtonElement>) => {
    setLayerUIState(LAYER_UI_STATE.IDLE);
  };

  return (
    <motion.button
      onFocus={handleLayerSelection}
      onBlur={handleLayerDeselection}
      className={cn(
        'Layer h-10 rounded-xl bg-black text-xs text-white flex items-center px-2 select-none transition-all focus-visible:outline-none relative',
        LayerUIState === LAYER_UI_STATE.SELECTED &&
          'border-4 border-blue-500 my-6 shadow-md shadow-black/20 rounded-bl-xl rounded-tl-none rounded-r-none',
        className,
      )}
      style={{ width: `${length}%` }}
      {...(props as MotionProps)}>
      {LayerUIState === LAYER_UI_STATE.SELECTED && (
        <>
          <motion.span className="max-w-[80%] bg-blue-500 text-white text-xs absolute -top-[16px] -left-1 px-2 truncate rounded-t-md">
            {name}
          </motion.span>
          <motion.span className="h-10 p-0.5 flex items-center justify-center absolute -right-[14px] bg-blue-500 rounded-r-lg shadow-lg shadow-black/15">
            <IconGripVertical size={14} strokeWidth={1.5} />
          </motion.span>
        </>
      )}
      <span className="truncate">{name}</span>
    </motion.button>
  );
}
