import { cn, copyToClipboard } from '@/lib/utils';
import { useEffect, useState } from 'react';
import CraftedButton from './CraftedButton';

const CraftedCTCAction: React.FunctionComponent = () => {
  const [copyableContent, setCopyableContent] = useState<string>('');
  const [pastedContent, setPastedContent] = useState<string>('');
  const [contentCopied, setContentCopied] = useState<boolean>(false);

  const handleCopyableContentChange = (content: string) => {
    setCopyableContent(content);
  };

  const handlePastedContentChange = (content: string) => {
    setPastedContent(content);
  };

  useEffect(() => {
    setTimeout(() => {
      setContentCopied(false);
    }, 2500);
  }, [contentCopied]);

  const playCaptureContentAudio = function () {
    const captureContentAudio = new Audio('/media/audio/capture-sound.mp3');
    captureContentAudio.play();
  };

  const playClearContentAudio = function () {
    const clearContentAudio = new Audio('/media/audio/clear-data-sound.mp3');
    clearContentAudio.play();
  };

  return (
    <div className="copy-to-clipboard-action-component grid grid-cols-1 w-[340px] gap-4 max-md:w-[240px]">
      <div className="copy-paste-inputs-layer-container grid grid-cols-1 gap-2">
        <input
          type={'text'}
          placeholder={'Type text to copy'}
          onChange={(e) => handleCopyableContentChange(e?.target?.value)}
          value={copyableContent}
          className={cn(
            'px-4 py-2 w-full rounded-md border border-zinc-200 focus:outline-orange-200',
          )}
        />
        <input
          type={'text'}
          placeholder={'Paste here'}
          value={pastedContent}
          className={cn(
            'px-4 py-2 w-full rounded-md border border-zinc-200 focus:outline-orange-200',
          )}
          defaultValue={pastedContent}
          onChange={(e) => handlePastedContentChange(e?.target?.value)}
        />
      </div>
      <div className="action-button-layer-container flex flex-row items-center justify-between w-full">
        <CraftedButton
          variant={'outline'}
          onClick={() => {
            setPastedContent('');
            setCopyableContent('');
            playClearContentAudio();
          }}>
          {'Clear'}
        </CraftedButton>
        <CraftedButton
          onClick={() => {
            copyToClipboard({ content: copyableContent });
            setContentCopied(true);
            playCaptureContentAudio();
          }}>
          {!contentCopied ? 'Copy Text' : 'Copied'}
        </CraftedButton>
      </div>
    </div>
  );
};

export default CraftedCTCAction;
