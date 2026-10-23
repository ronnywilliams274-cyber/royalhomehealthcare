import { Link } from "react-router";
import { site } from "@/data/site";
import { PageHero, CheckList } from "@/components/Shared";

const features = [
  "Every page can be used with a keyboard alone, with a visible focus outline and a “Skip to main content” link",
  "Page structure uses real headings, landmarks and lists so screen readers can navigate it",
  "Images have text alternatives; decorative images are hidden from screen readers",
  "Text and controls meet WCAG AA colour-contrast ratios",
  "Text can be enlarged to 200% and the layout adapts down to a 320-pixel-wide screen without loss of content",
  "Background video is silent and decorative, can be paused, and never autoplays when your device asks for reduced motion",
  "A “Reduce motion” switch in the footer turns off animations on this site",
  "Forms have visible labels, clear error messages and do not time out",
  "Any future video with speech will have closed captions and a transcript",
  "Pages work in Windows High Contrast mode and can be printed cleanly",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility statement"
        title="A website everyone can use."
        intro={
          <p>
            {site.name} is committed to making our website accessible to people with disabilities, including people who use
            screen readers, keyboard navigation, captions, magnification or voice control.
          </p>
        }
      />

      <div className="bg-cream">
        <div className="container-royal py-20 lg:py-24">
          <div className="prose-royal max-w-4xl space-y-14">
          <section aria-labelledby="standard-title">
            <h2 id="standard-title" className="h-display text-h3 text-forest">
              Our standard
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
              We aim for this website to conform to the{" "}
              <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">
                Web Content Accessibility Guidelines (WCAG) 2.1, Level AA<span className="sr-only"> (opens in a new tab)</span>
              </a>
              , the standard referenced by the U.S. Department of Health and Human Services for health care providers and widely
              used to measure accessibility under the Americans with Disabilities Act.
            </p>
          </section>

          <section aria-labelledby="features-title">
            <h2 id="features-title" className="h-display text-h3 text-forest">
              What we've done
            </h2>
            <div className="mt-6">
              <CheckList items={features} />
            </div>
          </section>

          <section aria-labelledby="testing-title">
            <h2 id="testing-title" className="h-display text-h3 text-forest">
              How we test
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
              Pages are checked with automated WCAG 2.1 A and AA tests, keyboard-only walkthroughs, colour-contrast
              measurement and zoom/reflow checks. Automated tools can't catch everything, so we also
              review content by hand and welcome your feedback. This statement was last reviewed in {site.accessibilityReviewed}.
            </p>
          </section>

          <section aria-labelledby="limits-title">
            <h2 id="limits-title" className="h-display text-h3 text-forest">
              Known limitations
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-charcoal/90">
              <li>
                Links to other websites (for example Google Maps) are outside our control and may not meet the
                same standard.
              </li>
              <li>Documents you receive from us in print can be provided in large print or another format on request.</li>
            </ul>
          </section>

          <section aria-labelledby="help-title" className="rounded-3xl border border-forest/10 bg-white p-8">
            <h2 id="help-title" className="h-display text-h3 text-forest">
              Need help or found a barrier?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/90">
              If any part of this site is hard to use, or you need information in a different format, please tell us. We'll
              provide the information another way and work to fix the problem.
            </p>
            <ul className="mt-5 space-y-2 text-lg">
              <li>
                Phone: <a href={site.phoneHref}>{site.phone}</a> ({site.hours.label})
              </li>
              <li>
                Email: <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>
                Mail: {site.name}, {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </li>
              <li>California Relay Service: dial 711</li>
            </ul>
            <p className="mt-5 text-charcoal/90">
              You can also file a civil rights complaint at any time. See our <Link to="/nondiscrimination">nondiscrimination notice</Link> for contact details.
            </p>
          </section>
          </div>
        </div>
      </div>
    </>
  );
}
