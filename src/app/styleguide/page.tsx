import { Heading, Highlight } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Textarea } from "@/components/atoms/Textarea";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Radio } from "@/components/atoms/Radio";
import { Badge } from "@/components/atoms/Badge";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  XIcon,
  SearchIcon,
  MenuIcon,
  ExternalLinkIcon,
} from "@/components/atoms/Icon";
import { LogoMarquee } from "@/components/molecules/LogoMarquee";

/* ———————————————————————————————————————
   Helper: Section wrapper for the guide
   ——————————————————————————————————————— */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-brand-dark-7 pb-16">
      <h2 className="font-heading text-[1.5rem] font-semibold text-brand-dark mb-8">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h3 className="font-body text-[0.8125rem] font-extrabold uppercase tracking-wider text-brand-dark-60 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ———————————————————————————————————————
   Styleguide Page
   ——————————————————————————————————————— */
export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-20">
      {/* Page Header */}
      <div className="mb-16">
        <Heading level={1}>SoftCo Styleguide</Heading>
        <Paragraph className="mt-4 max-w-2xl text-brand-dark">
          A living reference of every atom in the design system. Built from the
          SoftCo brand guidelines — Erode for headings, Plus Jakarta Sans for
          body, with the full brand color palette.
        </Paragraph>
      </div>

      <div className="flex flex-col gap-16">
        {/* ——— COLOR PALETTE ——— */}
        <Section title="Color Palette">
          <SubSection title="Primary Colors">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              <ColorSwatch color="#047fe5" name="SoftCo Blue" token="brand-blue" />
              <ColorSwatch color="#060d2e" name="Dark Blue" token="brand-dark" />
              <ColorSwatch color="#f7931e" name="Orange" token="brand-orange" />
              <ColorSwatch color="#e8f2fd" name="Light Blue" token="brand-light-blue" dark />
              <ColorSwatch color="#F2F2F2" name="Grey" token="brand-grey" dark />
            </div>
          </SubSection>

          <SubSection title="Blue Tints">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              <ColorSwatch color="#047fe5" name="100%" />
              <ColorSwatch color="#369be8" name="80%" />
              <ColorSwatch color="#68b6ee" name="60%" />
              <ColorSwatch color="#9bd2f3" name="40%" dark />
              <ColorSwatch color="#cde8f9" name="20%" dark />
              <ColorSwatch color="#edf6fd" name="7%" dark />
            </div>
          </SubSection>

          <SubSection title="Dark Tints">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              <ColorSwatch color="#060d2e" name="100%" />
              <ColorSwatch color="#383a58" name="80%" />
              <ColorSwatch color="#6a6b82" name="60%" />
              <ColorSwatch color="#9b9dab" name="40%" />
              <ColorSwatch color="#cdced5" name="20%" dark />
              <ColorSwatch color="#ededef" name="7%" dark />
            </div>
          </SubSection>

          <SubSection title="Orange Tints">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              <ColorSwatch color="#f7931e" name="100%" />
              <ColorSwatch color="#f9a94b" name="80%" />
              <ColorSwatch color="#fabe78" name="60%" dark />
              <ColorSwatch color="#fcd4a5" name="40%" dark />
              <ColorSwatch color="#fde9d2" name="20%" dark />
              <ColorSwatch color="#fef6ed" name="7%" dark />
            </div>
          </SubSection>
        </Section>

        {/* ——— TYPOGRAPHY ——— */}
        <Section title="Typography">
          <SubSection title="Headings (Erode)">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H1 — Erode Semibold — 36/48/56px
                </span>
                <Heading level={1}>
                  AI-powered P2P & AP automation
                </Heading>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H2 — Erode Medium — 28/36/48px
                </span>
                <Heading level={2}>
                  Tailored to perfection
                </Heading>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H3 — Erode Medium — 24/28/32px
                </span>
                <Heading level={3}>
                  Outcomes you can evidence
                </Heading>
              </div>
            </div>
          </SubSection>

          <SubSection title="Headings (Plus Jakarta Sans)">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H4 — Plus Jakarta Sans Extrabold — 14px — Uppercase
                </span>
                <Heading level={4}>For complex, fast-growing enterprises</Heading>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H5 — Plus Jakarta Sans Bold — 14/16px
                </span>
                <Heading level={5}>Modular AI-native platform</Heading>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  H6 — Plus Jakarta Sans Semibold — 12/14px
                </span>
                <Heading level={6}>Implementation risk reduced</Heading>
              </div>
            </div>
          </SubSection>

          <SubSection title="Word Highlighting">
            <Heading level={2}>
              Finance may be complex.{" "}
              <Highlight>Your automation</Highlight> should not be.
            </Heading>
            <Paragraph className="mt-2 text-brand-dark-40">
              Use &lt;Highlight&gt; inside headings to apply SoftCo Blue to key words.
            </Paragraph>
          </SubSection>

          <SubSection title="Body Text">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  Body Large — 16/18px
                </span>
                <Paragraph>
                  SoftCo combines deep finance expertise, a modular AI-native
                  platform and a tailored approach to each implementation. The
                  result is automation that fits the first time.
                </Paragraph>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  Body Base — 16px
                </span>
                <Paragraph>
                  Our tailored delivery process reverses the common approach. We
                  adapt delivery to each organisation&apos;s controls, governance,
                  tax rules and ERP architecture.
                </Paragraph>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  Body Small — 14px
                </span>
                <Paragraph>
                  Instead of forcing processes to suit software, we configure the
                  platform to fit the customer.
                </Paragraph>
              </div>
              <div>
                <span className="font-body text-[0.75rem] text-brand-dark-40 mb-1 block">
                  Caption — 12px Medium
                </span>
                <Paragraph size="caption">
                  Results based on 2024 customer data across 150+ implementations.
                </Paragraph>
              </div>
            </div>
          </SubSection>

          <SubSection title="Pullout Quote">
            <blockquote className="font-body text-[1.25rem] leading-[1.4] text-brand-dark max-w-2xl md:text-[1.5rem] border-l-4 border-brand-blue pl-6">
              &ldquo;Because &apos;good enough&apos; never survived an audit.&rdquo;
            </blockquote>
          </SubSection>
        </Section>

        {/* ——— BUTTONS ——— */}
        <Section title="Buttons">
          <SubSection title="Primary">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary</Button>
              <Button iconAfter={<ChevronRightIcon />}>With Icon</Button>
              <Button disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Secondary (Blue Outline)">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" iconAfter={<ChevronRightIcon />}>With Icon</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Dark (Dark Blue)">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="dark">Dark</Button>
              <Button variant="dark" iconAfter={<ChevronRightIcon />}>With Icon</Button>
              <Button variant="dark" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Dark Outline">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="dark-outline">Dark Outline</Button>
              <Button variant="dark-outline" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Orange (primary CTA with icon)">
            <p className="font-body text-[0.75rem] text-brand-dark-60 mb-3">
              Dark blue text, 5px radius. Icon: circle outline (dark blue) with chevron; on hover circle fills dark blue and chevron turns orange.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="orange" iconAfter={<ChevronRightIcon />}>
                See customer proof
              </Button>
              <Button variant="orange">Orange</Button>
              <Button variant="orange" iconAfter={<ChevronRightIcon />}>With Icon</Button>
              <Button variant="orange" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Orange Outline">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="orange-outline">Orange Outline</Button>
              <Button variant="orange-outline" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Text / Link Style">
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="text">Text link</Button>
              <Button variant="text" iconAfter={<ChevronRightIcon />}>With Icon</Button>
              <Button variant="text" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="As Links">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/contact">Internal Link</Button>
              <Button variant="secondary" href="https://softco.com" external>
                External Link
              </Button>
            </div>
          </SubSection>
        </Section>

        {/* ——— LINKS ——— */}
        <Section title="Links">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Link href="/about">Internal link (same tab)</Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="https://softco.com">
                External link (new tab) <ExternalLinkIcon className="inline ml-1" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ——— FORM FIELDS ——— */}
        <Section title="Form Fields">
          <div className="max-w-md flex flex-col gap-8">
            <SubSection title="Text Inputs">
              <div className="flex flex-col gap-6">
                <Input
                  label="Full Name"
                  placeholder="John Smith"
                  autoComplete="name"
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@company.com"
                  required
                  autoComplete="email"
                />
                <Input
                  label="With Error"
                  type="email"
                  placeholder="john@company.com"
                  error="Please enter a valid business email address."
                  defaultValue="john@gmail.com"
                />
                <Input
                  label="With Helper Text"
                  placeholder="Enter your company name"
                  helperText="Must be a registered business entity."
                />
                <Input
                  label="Disabled"
                  placeholder="Cannot edit"
                  disabled
                />
              </div>
            </SubSection>

            <SubSection title="Select">
              <div className="flex flex-col gap-6">
                <Select
                  label="Industry"
                  placeholder="Select an industry..."
                  options={[
                    { value: "finance", label: "Finance" },
                    { value: "healthcare", label: "Healthcare" },
                    { value: "manufacturing", label: "Manufacturing" },
                    { value: "technology", label: "Technology" },
                  ]}
                />
                <Select
                  label="With Error"
                  placeholder="Select..."
                  options={[
                    { value: "a", label: "Option A" },
                    { value: "b", label: "Option B" },
                  ]}
                  error="Please select an option."
                />
              </div>
            </SubSection>

            <SubSection title="Textarea">
              <div className="flex flex-col gap-6">
                <Textarea
                  label="Message"
                  placeholder="Tell us about your requirements..."
                />
                <Textarea
                  label="With Error"
                  placeholder="Tell us about your requirements..."
                  error="This field is required."
                />
              </div>
            </SubSection>

            <SubSection title="Checkbox & Radio">
              <div className="flex flex-col gap-4">
                <Checkbox label="I agree to the privacy policy" />
                <Checkbox label="Subscribe to newsletter" defaultChecked />
                <Checkbox label="With error" error="You must agree to continue." />
                <Checkbox label="Disabled option" disabled />
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <span className="font-body text-[0.875rem] font-medium text-brand-dark">
                  Preferred contact method
                </span>
                <Radio name="contact" label="Email" defaultChecked />
                <Radio name="contact" label="Phone" />
                <Radio name="contact" label="Video call" />
                <Radio name="contact-disabled" label="Disabled option" disabled />
              </div>
            </SubSection>
          </div>
        </Section>

        {/* ——— BADGES ——— */}
        <Section title="Badges / Tags">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="blue">Solution</Badge>
            <Badge variant="orange">Featured</Badge>
            <Badge variant="dark">New</Badge>
            <Badge variant="light">Industry</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge small>Small default</Badge>
            <Badge small variant="blue">Small blue</Badge>
            <Badge small variant="orange">Small orange</Badge>
          </div>
        </Section>

        {/* ——— ICONS ——— */}
        <Section title="Icons">
          <SubSection title="Available Icons">
            <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
              <IconShowcase icon={<ChevronDownIcon />} name="ChevronDown" />
              <IconShowcase icon={<ChevronRightIcon />} name="ChevronRight" />
              <IconShowcase icon={<XIcon />} name="X / Close" />
              <IconShowcase icon={<SearchIcon />} name="Search" />
              <IconShowcase icon={<MenuIcon />} name="Menu" />
              <IconShowcase icon={<ExternalLinkIcon />} name="External" />
            </div>
          </SubSection>

          <SubSection title="Sizes">
            <div className="flex items-end gap-6">
              <div className="flex flex-col items-center gap-1">
                <SearchIcon />
                <span className="font-body text-[0.6875rem] text-brand-dark-40">sm (16)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <SearchIcon />
                <span className="font-body text-[0.6875rem] text-brand-dark-40">md (20)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <SearchIcon />
                <span className="font-body text-[0.6875rem] text-brand-dark-40">lg (24)</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <SearchIcon size="xl" />
                <span className="font-body text-[0.6875rem] text-brand-dark-40">xl (32)</span>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ——— MOLECULES: LOGO MARQUEE ——— */}
        <Section title="Logo Marquee">
          <SubSection title="Infinite scroll with fade edges">
            <p className="font-body text-[0.75rem] text-brand-dark-60 mb-4">
              Logos at 100×40px. Fade-out on both sides. Pause on hover.
            </p>
            <div className="max-w-2xl">
              <LogoMarquee
                logos={[
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                  { src: "/next.svg", alt: "Next.js" },
                  { src: "/vercel.svg", alt: "Vercel" },
                ]}
                duration={64} 
              />
            </div>
          </SubSection>
        </Section>

        {/* ——— SPACING REFERENCE ——— */}
        <Section title="Spacing Reference">
          <div className="flex flex-col gap-3">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96].map((px) => (
              <div key={px} className="flex items-center gap-4">
                <span className="font-body text-[0.75rem] text-brand-dark-40 w-12 text-right tabular-nums">
                  {px}px
                </span>
                <div
                  className="h-3 rounded bg-brand-blue"
                  style={{ width: `${px}px` }}
                />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ———————————————————————————————————————
   Internal helper components
   ——————————————————————————————————————— */

function ColorSwatch({
  color,
  name,
  token,
  dark = false,
  size = "md",
}: {
  color: string;
  name: string;
  token?: string;
  dark?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${
          size === "sm" ? "h-12" : "h-20"
        } w-full rounded-lg border border-brand-dark-7`}
        style={{ backgroundColor: color }}
      />
      <div>
        <p
          className={`font-body text-[0.75rem] font-medium ${
            dark ? "text-brand-dark" : "text-brand-dark"
          }`}
        >
          {name}
        </p>
        <p className="font-body text-[0.6875rem] text-brand-dark-40 font-mono">
          {color}
        </p>
        {token && (
          <p className="font-body text-[0.6875rem] text-brand-dark-40">
            {token}
          </p>
        )}
      </div>
    </div>
  );
}

function IconShowcase({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-brand-dark-7">
      <span className="text-brand-dark">{icon}</span>
      <span className="font-body text-[0.6875rem] text-brand-dark-40 text-center">
        {name}
      </span>
    </div>
  );
}
