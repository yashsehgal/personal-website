import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function EssayFigure({
  n,
  caption,
  children,
}: {
  n: number;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="flex w-full min-w-0 flex-col items-center">
      <div className="w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-background px-4 py-8">
        {children}
      </div>
      <figcaption className="mt-3 w-full text-center font-serif text-sm italic leading-normal text-pretty text-muted-foreground">
        fig {n}. {caption}
      </figcaption>
    </figure>
  );
}

export function EssayFlow({
  n,
  caption,
  steps,
}: {
  n: number;
  caption: string;
  steps: readonly string[];
}) {
  return (
    <EssayFigure n={n} caption={caption}>
      <ol className="mx-auto flex w-max items-center gap-2">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            {index > 0 ? (
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 shrink-0 text-foreground/40"
              />
            ) : null}
            <div className="rounded-sm border border-border bg-muted px-3 py-2 text-xs tracking-tight whitespace-nowrap text-foreground">
              {step}
            </div>
          </li>
        ))}
      </ol>
    </EssayFigure>
  );
}

