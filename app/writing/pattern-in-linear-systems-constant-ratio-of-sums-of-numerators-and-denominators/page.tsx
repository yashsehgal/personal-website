import { InternalWritingContainer } from '@/components/sections/internal-writing-container';
import { IconPdf } from '@tabler/icons-react';
import Link from 'next/link';

export default function PaperPatternInLinearSystemsConstantRatioOfSumsOfNumeratorsAndDenominatorsPage() {
  return (
    <InternalWritingContainer>
      <div>
        <Link
          href="https://drive.google.com/file/d/16vSHqIWB0zX-yr0_cITbeJsMEEkfbv2k/view?usp=sharing"
          target="_blank"
          className="w-fit shadow-2xs max-lg:w-full rounded-lg bg-transparent border border-foreground/10 flex items-center justify-start py-2 px-4 gap-2 hover:bg-foreground/5">
          <IconPdf />
          <span>Read the paper with proofs and tests</span>
        </Link>
      </div>
      <p>
        This research explores a family of linear systems where the coefficients
        and constants follow an arithmetic progression:
      </p>
      <div className="border border-foreground/10 rounded-lg p-4 italic">
        <p className="text-center!">(n)x + (n + 1)y = n + 2</p>
        <p className="text-center!">(n + 3)x + (n + 4)y = n + 5</p>
      </div>
      <p>
        At first glance, the solution seems like it should depend on{' '}
        <span className="font-serif italic">n</span>, since every term changes
        with it. However, when the system is solved, all the{' '}
        <span className="font-serif italic">n</span>-terms cancel out during
        simplification. The result is surprising:
      </p>
      <p>The result is surprising:</p>
      <div className="border border-foreground/10 rounded-lg p-4 italic">
        <p className="text-center!">(x, y) = (-1, 2)</p>
      </div>
      <p>
        This solution remains the same for all real values of{' '}
        <span className="font-serif italic">n</span>, including positive,
        negative, and decimal values.
      </p>
      <p>
        The research also examines a ratio formed from the numerators and
        denominators of the solutions. That ratio consistently evaluates to:
      </p>
      <div className="border border-foreground/10 rounded-lg p-4 italic">
        <p className="text-center!">R = 0.5</p>
      </div>
      <p>
        Just like the solution itself, this ratio does not change with{' '}
        <span className="font-serif italic">n</span>.
      </p>
      <p>
        Even though the equations shift with the parameter, the outcome stays
        constant. This highlights a simple but interesting structural pattern
        within this family of linear systems.
      </p>
    </InternalWritingContainer>
  );
}
