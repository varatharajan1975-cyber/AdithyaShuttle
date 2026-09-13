import { Cta } from "./ui/cta";
import { Reveal } from "./ui/reveal";
import { Section } from "./ui/section";
import { PlusIcon } from "./ui/icons";
import { CONTACT, FAQS, PRIMARY_PHONE } from "@/content/site";

export function Faq() {
  const enquiryHref = PRIMARY_PHONE ? `tel:${PRIMARY_PHONE}` : CONTACT.instagram;

  return (
    <Section
      id="faq"
      eyebrow="Questions"
      split
      title={
        <>
          The things people{" "}
          <span className="accent-word text-amber-300">always ask</span>
        </>
      }
      intro="Shoes, rackets, parking and how booking actually works."
      aside={
        <Cta href={enquiryHref} variant="secondary" size="lg">
          Ask something else
        </Cta>
      }
    >
      {/*
        Native <details>/<summary> rather than a JavaScript accordion. The
        browser already gives this the right semantics, keyboard behaviour and
        find-in-page support, and it costs no client bundle — a hand-rolled
        version would be strictly worse on all four counts.
      */}
      <ul className="mx-auto max-w-3xl border-t border-hairline">
        {FAQS.map((faq, index) => (
          <li key={faq.question}>
            <Reveal delay={index * 50}>
              <details className="group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-amber-200 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-amber-400/50 group-open:text-amber-300"
                  >
                    <PlusIcon className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
