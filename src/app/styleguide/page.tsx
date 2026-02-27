import { Heading, Highlight } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Blockquote } from "@/components/atoms/Blockquote";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Checkbox } from "@/components/atoms/Checkbox";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { DataList } from "@/components/molecules/DataList";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-brand-dark-7 pb-16">
      <h2 className="mb-8 font-heading text-[40px] font-semibold leading-[44px] text-brand-dark">
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
      <h3 className="mb-4 font-body text-[14px] font-extrabold uppercase tracking-widest text-brand-dark-60">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-1 block font-body text-[12px] text-brand-dark-40">
      {children}
    </span>
  );
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 lg:px-20">
      <div className="mb-16">
        <Heading level={1}>SoftCo Styleguide</Heading>
        <Paragraph className="mt-4 max-w-2xl">
          A living reference of the design system atoms and molecules, built
          from the latest SoftCo brand guidelines.
        </Paragraph>
      </div>

      <div className="flex flex-col gap-16">
        {/* ——— COLORS ——— */}
        <Section title="Colors">
          <SubSection title="Primary">
            <div className="grid grid-cols-3 gap-4">
              <ColorSwatch color="#060D2E" name="Dark Blue" token="brand-dark" />
              <ColorSwatch color="#047FE5" name="SoftCo Blue" token="brand-blue" />
              <ColorSwatch color="#F7931E" name="Orange" token="brand-orange" />
            </div>
          </SubSection>
          <SubSection title="Secondary">
            <div className="grid grid-cols-3 gap-4">
              <ColorSwatch color="#C0DFF8" name="Pale Blue" token="brand-pale-blue" dark />
              <ColorSwatch color="#E8F2FD" name="Light Blue" token="brand-light-blue" dark />
              <ColorSwatch color="#DADBE0" name="Grey" token="brand-grey" dark />
            </div>
          </SubSection>
        </Section>

        {/* ——— TYPOGRAPHY ——— */}
        <Section title="Typography">
          <SubSection title="Overline">
            <Label>Plus Jakarta Sans · 800 · 14px / 14px · 10% tracking · Uppercase</Label>
            <Overline>Client success stories</Overline>
          </SubSection>

          <SubSection title="Headings (Erode)">
            <div className="flex flex-col gap-8">
              <div>
                <Label>H1 — Erode Semibold — 80px / 84px</Label>
                <Heading level={1}>AI-powered P2P &amp; AP automation</Heading>
              </div>
              <div>
                <Label>H2 — Erode Semibold — 60px / 64px</Label>
                <Heading level={2}>Tailored to perfection</Heading>
              </div>
              <div>
                <Label>H3 — Erode Semibold — 40px / 44px</Label>
                <Heading level={3}>Outcomes you can evidence</Heading>
              </div>
              <div>
                <Label>H4 — Erode Semibold — 36px / 48px · -1%</Label>
                <Heading level={4}>For complex, fast-growing enterprises</Heading>
              </div>
              <div>
                <Label>H5 — Erode Semibold — 32px / 36px · -1%</Label>
                <Heading level={5}>Modular AI-native platform</Heading>
              </div>
              <div>
                <Label>H6 — Erode Medium — 28px / 34px · -1%</Label>
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
            <Label>Plus Jakarta Sans · 400 · 20px / 32px</Label>
            <Paragraph className="max-w-2xl">
              SoftCo combines deep finance expertise, a modular AI-native
              platform and a tailored approach to each implementation. The
              result is automation that fits the first time.
            </Paragraph>
          </SubSection>

          <SubSection title="Blockquote">
            <Label>Plus Jakarta Sans · 400 · 28px / 40px · Blue left bar · 24px padding</Label>
            <div className="max-w-2xl">
              <Blockquote
                quote="Because 'good enough' never survived an audit."
                authorName="Jane Doe"
                authorRole="VP Finance, Acme Corp"
              />
            </div>
          </SubSection>

          <SubSection title="Big Page Quote">
            <Label>Plus Jakarta Sans · 400 · 40px / 56px</Label>
            <div className="max-w-3xl">
              <Blockquote
                size="large"
                quote="Invoices now are going through at 80% touchless processing. Prior to SoftCo, it was between 5–10% maximum."
                authorName="Martin Ray"
                authorRole="Accounts Payable Manager, SuperDry"
              />
            </div>
          </SubSection>

          <SubSection title="Lists (UL / OL)">
            <Label>Plus Jakarta Sans · 400 · 20px / 32px · Orange markers · 24px padding</Label>
            <div className="body-list max-w-xl">
              <ul className="list-disc">
                <li>Fraud risk reduction across all AP channels</li>
                <li>Better data accuracy and compliance</li>
                <li>Enhanced vendor relationships</li>
              </ul>
            </div>
            <div className="body-list mt-6 max-w-xl">
              <ol className="list-decimal">
                <li>Understand the fit</li>
                <li>Engineer the fit</li>
                <li>Build the fit</li>
              </ol>
            </div>
          </SubSection>
        </Section>

        {/* ——— BUTTONS ——— */}
        <Section title="Buttons">
          <SubSection title="Primary (Orange CTA)">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="orange" iconAfter={<ChevronRightIcon />}>
                Learn more
              </Button>
              <Button variant="orange">Orange</Button>
              <Button variant="orange" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Primary (Dark)">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="dark" iconAfter={<ChevronRightIcon />}>
                Learn more
              </Button>
              <Button variant="dark">Dark</Button>
              <Button variant="dark" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="Secondary (Read More)">
            <Label>Text link with orange underline. On hover, arrow swaps from right to left.</Label>
            <div className="flex flex-wrap items-center gap-8">
              <Button variant="read-more">Read more</Button>
              <Button variant="read-more" disabled>Disabled</Button>
            </div>
          </SubSection>

          <SubSection title="All Other Variants">
            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary Blue</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="dark-outline">Dark Outline</Button>
              <Button variant="orange-outline">Orange Outline</Button>
              <Button variant="text">Text link</Button>
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

        {/* ——— FORM FIELDS ——— */}
        <Section title="Form Fields">
          <SubSection title="Dark Variant (Blue Background)">
            <div className="max-w-2xl rounded-xl bg-brand-blue p-8 md:p-12">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <Input
                  variant="dark"
                  label="Enter first name"
                  placeholder="First name *"
                  required
                />
                <Input
                  variant="dark"
                  label="Last name"
                  placeholder="Donlon"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
                <Input
                  variant="dark"
                  label="Email"
                  type="email"
                  placeholder="myemail@gmail.com"
                />
                <Input
                  variant="dark"
                  label="Phone"
                  type="tel"
                  placeholder="555-458 52"
                />
              </div>
              <div className="mt-6">
                <Textarea
                  variant="dark"
                  label="Enter message"
                  placeholder="Enter message"
                />
              </div>
              <div className="mt-4">
                <Checkbox
                  variant="dark"
                  label="I agree my information can be used to contact me regarding my enquiry"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="orange" iconAfter={<ChevronRightIcon />}>
                  Send message
                </Button>
              </div>
            </div>
          </SubSection>

          <SubSection title="Light Variant (White Background)">
            <div className="max-w-2xl rounded-xl bg-white p-8 md:p-12">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <Input
                  variant="light"
                  label="Enter first name"
                  placeholder="First name *"
                  required
                />
                <Input
                  variant="light"
                  label="Last name"
                  placeholder="Donlon"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
                <Input
                  variant="light"
                  label="Email"
                  type="email"
                  placeholder="myemail@gmail.com"
                />
                <Input
                  variant="light"
                  label="Phone"
                  type="tel"
                  placeholder="555-458 52"
                />
              </div>
              <div className="mt-6">
                <Textarea
                  variant="light"
                  label="Enter message"
                  placeholder="Enter message"
                />
              </div>
              <div className="mt-4">
                <Checkbox
                  variant="light"
                  label="I agree my information can be used to contact me regarding my enquiry"
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="orange" iconAfter={<ChevronRightIcon />}>
                  Send message
                </Button>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ——— DATA LIST ——— */}
        <Section title="Data List">
          <SubSection title="Icon + Title + Description">
            <Label>Icon 35x35 orange · Title 20/28 bold · Description 20/32 regular</Label>
            <div className="max-w-3xl">
              <DataList
                items={[
                  {
                    icon: (
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect width="35" height="35" rx="6" fill="currentColor" fillOpacity="0.15" />
                        <path d="M12 17.5h11M17.5 12v11" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ),
                    title: "AI native",
                    description:
                      "Intelligence built into the platform, not bolted on, supporting better decisions across AP and P2P.",
                  },
                  {
                    icon: (
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect width="35" height="35" rx="6" fill="currentColor" fillOpacity="0.15" />
                        <circle cx="17.5" cy="17.5" r="6" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ),
                    title: "Single tenant security",
                    description:
                      "Enterprise-grade security by design. Governance controls that stand up to audit and assurance.",
                  },
                  {
                    icon: (
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect width="35" height="35" rx="6" fill="currentColor" fillOpacity="0.15" />
                        <path d="M10 17.5h15M17.5 10v15" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ),
                    title: "Multi-ERP orchestration",
                    description:
                      "Orchestrate processes across SAP, Oracle, Dynamics and 200+ other ERP environments, without compromise.",
                  },
                  {
                    icon: (
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect width="35" height="35" rx="6" fill="currentColor" fillOpacity="0.15" />
                        <path d="M12 12l11 11M23 12l-11 11" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    ),
                    title: "Modular",
                    description:
                      "Start with the right capability for today, then extend without rework as your processes, volumes and complexity evolve.",
                  },
                ]}
              />
            </div>
          </SubSection>
        </Section>
      </div>
    </div>
  );
}

function ColorSwatch({
  color,
  name,
  token,
  dark = false,
}: {
  color: string;
  name: string;
  token?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-24 w-full rounded-lg border border-brand-dark-7"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="font-body text-[14px] font-medium text-brand-dark">{name}</p>
        <p className="font-mono text-[12px] text-brand-dark-40">{color}</p>
        {token && (
          <p className="font-body text-[12px] text-brand-dark-40">{token}</p>
        )}
      </div>
    </div>
  );
}
