import { title as homeTitle } from '@/app/layout.config';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';

const LAST_UPDATED = 'March 2, 2025';

export default function TermsOfService() {
  return (
    <>
      <Section className='p-4 text-center lg:p-6'>
        <h1 className='mb-2 font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          Terms of Service
        </h1>
        <p className='text-muted-foreground text-sm'>
          Last updated: {LAST_UPDATED}
        </p>
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
    title: 'Overview',
    content: (
      <p>
        SaasCN is a comprehensive business operations platform that helps
        organizations streamline their workflows and processes. By using our
        platform, you agree to these terms.
      </p>
    ),
  },
  {
    title: 'Service Description',
    content: (
      <div className='space-y-8'>
        <div>
          <h3 className='mb-3 font-medium text-card-foreground text-xl'>
            Platform Services
          </h3>
          <ul className='ml-4 list-disc space-y-2'>
            <li>
              Our platform provides tools for workflow automation, analytics,
              and business process management.
            </li>
            <li>
              We offer various features including team collaboration, reporting,
              and third-party integrations.
            </li>
            <li>
              The service is provided under standard business terms and
              conditions.
            </li>
          </ul>
        </div>
        <div>
          <h3 className='mb-3 font-medium text-card-foreground text-xl'>
            Third-Party Integrations
          </h3>
          <ul className='ml-4 list-disc space-y-2'>
            <li>
              Our platform integrates with various third-party services for
              enhanced functionality.
            </li>
            <li>
              Users must comply with the terms of service of any integrated
              third-party services.
            </li>
            <li>
              We are not responsible for disruptions in third-party services.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: 'User Responsibilities',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>By using our platform, you agree to:</p>
        <ul className='ml-4 list-disc space-y-2'>
          <li>Comply with all applicable laws and regulations.</li>
          <li>Maintain the security of your account credentials.</li>
          <li>Use the platform for legitimate business purposes only.</li>
          <li>Respect intellectual property rights and data privacy.</li>
          <li>Report any security or technical issues promptly.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Service Terms',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>Our service terms include:</p>
        <ul className='ml-4 list-disc space-y-2'>
          <li>Fair usage policies for all platform features.</li>
          <li>Standard service level agreements (SLAs).</li>
          <li>Regular maintenance and update schedules.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Data Policies',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>Our data handling policies ensure:</p>
        <ul className='ml-4 list-disc space-y-2'>
          <li>Secure processing and storage of business data.</li>
          <li>Compliance with data protection regulations.</li>
          <li>Regular backups and data recovery procedures.</li>
          <li>Clear data retention and deletion policies.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Contact Information',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>
          For any questions or concerns regarding these terms, please reach out
          through our support channels:
        </p>
        <div className='flex flex-col space-y-2'>
          <Link
            href='/contact'
            className='inline-flex items-center text-fd-primary underline duration-300 hover:text-fd-primary/70'
          >
            Contact Support
          </Link>
        </div>
      </div>
    ),
  },
];

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description = `Terms of service for ${homeTitle}. Last updated on ${LAST_UPDATED}.`;

  return createMetadata({
    title: 'Terms of Service',
    description,
    openGraph: {
      url: '/terms',
    },
    alternates: {
      canonical: '/terms',
    },
  });
}
