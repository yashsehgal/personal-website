import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContentLink } from "@/components/content-link";
import {
  ArticlePhoto,
  articlePhotos,
  BrandingCollage,
  GoldenGooseCollage,
  JobsCollage,
  TypographyCollage,
  WatchesCollage,
} from "./collages";

export const metadata: Metadata = {
  title: "Thoughts about building taste #1 · Yash Sehgal",
  description:
    "On building taste as a designer and engineer: music, Golden Goose, watches, type, and Nike, and how that attention shows up in a product.",
};

// ContentLink has ten hand-drawn marks; cycle through them down the list.
const MARK_COUNT = 10;

const furtherReading = [
  {
    href: "https://performance.dev/how-is-linear-so-fast-a-technical-breakdown",
    description:
      "Linear feels instant because the data the screen reads lives in the browser, and a change shows up before the server has answered. The speed is a long list of small decisions, not a single trick.",
  },
  {
    href: "https://linear.app/now/output-isn-t-design",
    description:
      "Making an interface is not the same as designing one. The hard part is knowing what should exist at all, and a polished screen can still be a poor fit for the problem.",
  },
  {
    href: "https://zocodesign.com/blog/ux-design-create-successful-products",
    description:
      "A product stands out when it does the job and makes doing it pleasant. Form and function stay together, and the choices start from the person using it.",
  },
  {
    href: "https://www.fibre2fashion.com/industry-article/10327/hermes-the-legacy-of-luxury-and-timeless-style",
    description:
      "Hermès began as a small Paris workshop making saddles, and stayed a luxury house by treating the handwork as the product. The scarves, the bags, and the later experiments all sit on that same craft.",
  },
  {
    href: "https://designmc.org/insights/premium-by-design-six-visual-principles-that-elevate-a-brand/",
    description:
      "What reads as premium is built from restraint: space, type, a tight palette, graphics that repeat on purpose, and photographs that look edited. If the experience itself is clumsy, that feeling falls apart.",
  },
  {
    href: "https://www.superside.com/blog/principles-of-design-guide",
    description:
      "The elements are the materials you place, and the principles are how you arrange them so the eye knows where to go. Naming which principle is failing turns a vague sense that something looks wrong into a decision.",
  },
] as const;

function siteName(href: string) {
  return new URL(href).hostname.replace(/^www\./, "");
}

// Paragraphs follow the site's rhythm: 16px apart, none after the last.
function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 last:mb-0">{children}</p>;
}

// One step of the essay: a picture with the text that talks about it.
// Steps sit 48px apart, the picture 24px above its text.
function Step({
  figure,
  children,
}: {
  figure?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mt-12">
      {figure ? <div className="mb-6">{figure}</div> : null}
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <div className="max-w-[480px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/writings" className="mb-6 self-start text-muted">
          Back
        </Link>
        <h1 className="text-base">Thoughts about building taste #1</h1>
        <p className="text-muted">Essay, 2026</p>
      </header>

      <article>
        <P>
          Recently I&apos;ve been thinking a lot about how someone develops
          taste. It&apos;s all over social media right now, and I think
          it&apos;s one of the things we, as engineers and designers, can still
          bring to the work to set ourselves apart from AI.
        </P>
        <P>
          There are guides for this. A lot of them stay on shadows, a model, a
          clean minimal UI, or how large an element should be inside a widget.
          Taste has more nuance than that. It&apos;s highly subjective, and
          it&apos;s a skill. The skill is understanding what you can contribute
          to a product, while keeping it usable, and while the work still feels
          like yours.
        </P>
        <P>
          Shipping code has become easy, so companies are pushing to release a
          lot of it quickly. That creates anxiety for creative people. Not
          because they&apos;ve gotten lazy. Because the pressure is up, and
          there&apos;s very little time left to think. Work used to move slower,
          and that left time outside the job to draw inspiration from. At this
          pace, building taste, and spending time with good design and art,
          matters more for anyone in a creative field.
        </P>
        <P>
          I expect the workload and the anxiety to keep growing, especially for
          designers. I&apos;ve felt it. I spent several months thinking about
          it while I was working, and I have a few ideas I want to follow over
          the next few years so the work stays human and feels fresh. If I use
          AI, what I hand over and what I do myself should be intentional. The
          result should feel creative, and it should solve the customer&apos;s
          problem. That is still the job.
        </P>

        <Step figure={<JobsCollage />}>
          <P>
            Start from a niche you actually care about. You don&apos;t need to
            force one because everyone else has one. You also don&apos;t need
            to be a graphic designer or a photographer. A genre of music you
            love is already a kind of taste. The useful question is how that
            interest can show up in the work.
          </P>
          <P>
            Steve Jobs had excellent taste in music, and he brought it into
            Apple&apos;s products and the advertising. When Apple promoted
            Apple Music, the demos used carefully chosen tracks. The music was
            part of the presentation, and it changed how the product felt.
          </P>
          <P>
            You see a similar thing with photography, design, and film. Even a
            simple object, a toaster or a coffee machine, can have ads that feel
            cinematic. Companies hire music composers and film directors for
            this. It isn&apos;t strictly necessary. It becomes part of the
            branding anyway.
          </P>
          <P>
            You can practice the same attention. Watch films. Watch Disney, or
            other animation, and notice the motion, the micro-interactions, the
            small behaviors that feel human. The Grok bot uses eye expressions
            to feel more lifelike. That kind of detail can apply in any domain.
          </P>
          <P>
            Music is a rich place to draw from. So are mood boards: collections
            of shoes, watches, and brands that show what a material, a shape,
            or a mood can do.
          </P>
        </Step>

        <Step figure={<GoldenGooseCollage />}>
          <P>
            Golden Goose is a good example of a brand with a clear vibe: an
            old-Italian leather look, worn on purpose. The products look dirty
            and rugged, as if they&apos;ve been used hard, and they&apos;re
            brand new. The more you wear them, the better they look. That&apos;s
            a core part of the brand.
          </P>
          <P>
            The shoes themselves are relatively simple. Basic leather and
            stitching. The identity is the hand work. Details are hand-stitched.
            The leather is cut in the store, and each pair is assembled by hand,
            even though the raw materials are machine-produced.
          </P>
          <P>
            Anything bought in the store carries a vanilla gourmand scent, and
            it lasts, staying in the fabric through months of wear and several
            washes. The dust bag is just as direct. For dream use only. The
            brand is niche, and it isn&apos;t marketed heavily. People who know
            it keep buying, because the brand is so clear about the
            handcrafting and the deliberately worn, torn look. That clarity is
            what makes it worth studying.
          </P>
        </Step>

        <Step>
          <P>
            Another thing I want to keep working on is making products feel
            more natural.
          </P>
          <P>
            Onboarding is a big part of it. Imagine walking into a store to buy
            a high-end watch. The way the sales associate treats you matters.
          </P>
          <P>
            Are they willing to share a direct way to reach them, so the next
            visit goes through that same person?
          </P>
          <P>
            A demo can do some of this too. Give people a version they can
            actually use, with a day that looks like theirs. Then make it fast,
            and a little playful.
          </P>
        </Step>

        <Step figure={<WatchesCollage />}>
          <P>
            Look closely at a dial. A Reverso, a Tudor, a Seiko. The thickness
            of the numbers, Roman numerals or plain indices, and how
            much space sits around them.
          </P>
          <P>
            And the room around the object. Does it intimidate you, or leave you
            better than you came in? Even if you can&apos;t buy it right now,
            you should leave wanting to come back.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.watchBlueprint} />}>
          <P>
            The drawing shows the same care. Case size, thickness, bracelet
            width. You can read the object before it is on a wrist.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.watchRolexCaliber} />}>
          <P>
            Some products are intimidating. Rolex won&apos;t push a high-end
            watch until they know whether it&apos;s your first. That
            conversation is part of the branding, though gatekeeping like that
            can push people away as easily as it draws them in.
          </P>
          <P>
            What works better is the engineering, shown in pieces. Gears, screws, a
            thin dial and a thick dial. The brand is already known, which is why
            it needs so little marketing.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.watchSpecs} />}>
          <P>
            Omega, Jaeger-LeCoultre, and brands in that range put the weight on
            the parts. Material, grade, each piece on its own.
          </P>
          <P>
            Jaeger-LeCoultre shows the other side of this in its boutiques.
            Someone can walk in with no plan to buy a Reverso, and the staff
            will still take the time to talk with them. They leave with a
            strong impression of the brand.
          </P>
          <P>
            These are the things you decide, and then work hard to carry out.
            It&apos;s a collaborative effort.
          </P>
        </Step>

        <Step figure={<TypographyCollage />}>
          <P>
            Away from the dial, type deserves the same kind of attention. The
            weight, from a thin stamp to a heavy grotesque.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.typeBlob} />}>
          <P>
            Some letters are almost soft. Thick, uneven, more drawing than a
            system. You feel the weight before you read the word.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.typeFtFont} />}>
          <P>
            Then the spacing becomes the idea. Uneven heights, cut edges, one
            flat color behind them.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.typeAllover} />}>
          <P>
            How much copy they use, and the specific words they choose. Names
            and dates can stack until the type is the picture.
          </P>
        </Step>

        <Step figure={<BrandingCollage />}>
          <P>
            Sometimes the whole vibe is a few words on cloth, or a mountain and
            a place name.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.nikeV5} />}>
          <P>
            Nike goes the other direction. The graphics are sporty and specific.
            A shoe, a short story, a feeling built around the product.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.nikeSwoosh} />}>
          <P>
            Sometimes the mark is the whole layout. One shape, one sentence.
            Loud, and simple.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.nikeTravis} />}>
          <P>
            The same shoe can carry a person. A drawing, a name, a story written
            around the product.
          </P>
        </Step>

        <Step figure={<ArticlePhoto {...articlePhotos.nikeCortez} />}>
          <P>
            Or it is culture, said outright. A stage, a line of type, the shoe
            at the bottom. The brand invests in sport, and in the people who
            wear it.
          </P>
        </Step>

        <Step>
          <P>
            Either way, the product still has to be high quality. The vibe is
            what you build around that.
          </P>
          <P>
            As more of the code and the stable features get shaped with AI,
            these are the choices that keep a product from feeling like anyone
            could have shipped it.
          </P>
          <P>
            A lot of the marketing is falling to designers now, too. Design
            engineers already have the tools for it, screen recorders and
            utilities that generate video from code, and they know what is worth
            showing a customer.
          </P>
          <P>
            The person closest to the work can often make the more useful
            material.
          </P>
          <P>
            Design follows the same principles. The product should feel snappy.
            Loading should be quick.
          </P>
          <P>
            If you have an AI chat, the choreography should be clear and simple.
            It shouldn&apos;t feel like the model is wandering.
          </P>
          <P>
            Study how luxury brands treat someone in a physical store, and apply
            that to the digital product. Look at how other designers build an
            experience. As you learn, put your own DNA into the work.
          </P>
        </Step>
      </article>

      {/* Further reading, after a short rule. Each note ends with a link to
          the piece it summarises. */}
      <section aria-label="Further reading" className="mt-16">
        <div aria-hidden="true" className="mb-8 h-px w-8 bg-foreground/20" />
        <ol className="flex flex-col gap-4">
          {furtherReading.map((item, index) => (
            <li key={item.href} className="flex gap-3 text-muted">
              <span className="w-4 shrink-0 tabular-nums">{index + 1}</span>
              <span className="min-w-0">
                {item.description}{" "}
                <ContentLink href={item.href} mark={index % MARK_COUNT}>
                  {siteName(item.href)}
                </ContentLink>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
