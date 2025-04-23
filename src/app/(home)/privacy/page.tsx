import { title as homeTitle } from '@/app/layout.config';
import { InlineLink } from '@/components/inline-link';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const LAST_UPDATED = 'March 2, 2025';

export default function PrivacyPolicy() {
  return (
    <>
      <Section className='p-4 text-center lg:p-6'>
        <h1 className='mb-2 font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          Privacy Policy
        </h1>
        <div className='flex items-center justify-center gap-2'>
          <p className='text-muted-foreground text-sm'>
            Last updated: {LAST_UPDATED}
          </p>
          <span className='text-muted-foreground text-sm'>•</span>
          <InlineLink href='/terms' className='text-sm'>
            Terms of Service
          </InlineLink>
        </div>
      </Section>
      <Section>
        <div className='grid divide-y divide-dashed divide-border'>
          {sections.map((section) => (
            <div key={section.title} className='group p-6 transition-all'>
              <h2 className='mb-4 font-semibold text-xl tracking-tight'>
                {section.title}
              </h2>
              <div className='prose prose-sm prose-zinc dark:prose-invert max-w-none'>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

const sections = [
  {
    title: 'Our Commitment to Privacy',
    content: (
      <p>
        We take your privacy seriously. Our platform is designed to provide a secure
        environment where your business data is protected at all times.
      </p>
    ),
  },
  {
    title: 'Data Collection and Usage',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>
          We collect essential information to provide and improve our services,
          including account details and usage patterns.
        </li>
        <li>
          Business data is processed securely and never shared with third parties
          without explicit consent.
        </li>
        <li>
          Analytics data is used to improve platform performance and user
          experience.
        </li>
      </ul>
    ),
  },
  {
    title: 'Third-Party Services',
    content: (
      <p>
        Our platform may integrate with third-party services for analytics,
        payment processing, and other business functions. These services comply
        with industry standards for data security.
      </p>
    ),
  },
  {
    title: 'Data Security',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>All data is encrypted in transit and at rest.</li>
        <li>
          We implement regular security audits and penetration testing.
        </li>
        <li>
          Our infrastructure adheres to industry best practices for data
          protection.
        </li>
      </ul>
    ),
  },
  {
    title: 'Your Rights and Controls',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>Access and export your data at any time.</li>
        <li>
          Control your privacy settings and integration permissions.
        </li>
        <li>Request data deletion upon account closure.</li>
      </ul>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <p>
        If you have any questions about your privacy or how we handle your data,
        please contact us through our official support channels.
      </p>
    ),
  },
  {
    title: 'Updates to This Policy',
    content: (
      <p>
        We may update this privacy policy periodically. Users will be notified
        of any significant changes through the platform.
      </p>
    ),
  },
];

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = `Privacy Policy for ${homeTitle}. Last updated on ${LAST_UPDATED}.`;

  return createMetadata({
    title: 'Privacy Policy',
    description,
    openGraph: {
      url: '/privacy',
    },
    alternates: {
      canonical: '/privacy',
    },
  });
}
