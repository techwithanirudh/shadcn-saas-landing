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
        <div className='grid divide-y divide-dashed divide-border/70 dark:divide-border'>
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
        We take your privacy seriously. Our gaming marketplace is designed to
        provide a fun, secure environment where your data across multiple games
        is protected at all times.
      </p>
    ),
  },
  {
    title: 'Data Collection and Usage',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>
          We collect basic information such as username and game-related data to
          enhance your experience across our diverse portfolio.
        </li>
        <li>
          Personal data is never shared with third parties without your consent.
        </li>
        <li>
          Analytics data is used to improve gameplay, app performance, and
          overall marketplace experience.
        </li>
        <li>
          We do not collect sensitive information such as passwords or financial
          details.
        </li>
      </ul>
    ),
  },
  {
    title: 'Third-Party Services',
    content: (
      <p>
        Our marketplace may integrate third-party services for analytics, cloud
        storage, multiplayer features, and game updates. These services comply
        with industry standards for data security.
      </p>
    ),
  },
  {
    title: 'Data Security',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>All data is encrypted to ensure security.</li>
        <li>
          We implement regular security audits to safeguard your information.
        </li>
        <li>
          Our servers adhere to industry best practices for data protection.
        </li>
      </ul>
    ),
  },
  {
    title: 'Your Rights and Controls',
    content: (
      <ul className='ml-4 list-disc space-y-2'>
        <li>You can update or delete your account information at any time.</li>
        <li>
          You have the right to request data deletion upon account closure.
        </li>
        <li>You can opt out of data tracking features in the settings menu.</li>
      </ul>
    ),
  },
  {
    title: 'Contact Us',
    content: (
      <p>
        If you have any questions or concerns about your privacy or the way we
        handle your data across our gaming marketplace, please contact us
        through our official channels.
      </p>
    ),
  },
  {
    title: 'Updates to This Policy',
    content: (
      <p>
        We may update this privacy policy from time to time. Users will be
        notified of any significant changes through the app.
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
