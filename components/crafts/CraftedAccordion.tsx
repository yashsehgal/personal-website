import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Section from '../layout/Section';
import CraftedButton from './CraftedButton';

interface CraftedAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: string | React.ReactNode;
}

const CraftedAccordion: React.FunctionComponent<CraftedAccordionProps> = ({
  trigger,
  className,
  ...attr
}) => {
  const [toggleContent, setToggleContent] = useState(false);

  const playCheckAudio = function () {
    const checkAudio = new Audio('/media/audio/check-sound.mp3');
    checkAudio.play();
  };

  return (
    <div className="accordion-component w-[364px] max-md:w-[200px]" {...attr}>
      <CraftedButton
        className="accordion-component__trigger w-full justify-between max-md:text-sm"
        onClick={() => {
          setToggleContent(!toggleContent);
          playCheckAudio();
        }}>
        <span className="accordion-content truncate">{trigger}</span>
        <span className="accordion-screen-reader-trigger sr-only">
          {'accordion for ' + trigger}
        </span>
        {toggleContent ? (
          <>
            <ChevronUp className="w-4 h-4" />
            <span className="sr-only">{'accordion opened'}</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            <span className="sr-only">{'accordion closed'}</span>
          </>
        )}
      </CraftedButton>
      {toggleContent && (
        <Section className="accordion-component__content-body mt-2 max-md:text-sm border border-zinc-300 rounded p-4">
          {attr?.children}
          <span className="accordion-screen-reader-content sr-only">
            {'accordion for ' + trigger + ' says, ' + attr?.children}
          </span>
        </Section>
      )}
    </div>
  );
};

export default CraftedAccordion;
