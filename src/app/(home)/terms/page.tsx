import { title as homeTitle } from '@/app/layout.config';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { Github } from 'lucide-react';
import type { Metadata } from 'next';

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
    title: 'Overview',
    content: (
      <p>
        Tech with Anirudh Gaming is an open-source, multi-game marketplace that
        allows you to explore, play, and manage a variety of games in one place.
        By using our platform, you agree to these terms.
      </p>
    ),
  },
  {
    title: 'Service Description',
    content: (
      <div className='space-y-8'>
        <div>
          <h3 className='mb-3 font-medium text-card-foreground text-xl'>
            Gaming Marketplace
          </h3>
          <ul className='ml-4 list-disc space-y-2'>
            <li>
              Our platform hosts a diverse collection of games, curated to
              ensure quality and variety.
            </li>
            <li>
              We provide tools and features to enhance your gaming experience,
              including user profiles, leaderboards, and in-game analytics.
            </li>
            <li>
              The service is provided on an "as is" basis under an open-source
              MIT License.
            </li>
          </ul>
        </div>
        <div>
          <h3 className='mb-3 font-medium text-card-foreground text-xl'>
            Third-Party Integrations
          </h3>
          <ul className='ml-4 list-disc space-y-2'>
            <li>
              Our marketplace integrates with various third-party services for
              game updates, analytics, and community features.
            </li>
            <li>
              Users must adhere to the terms of service of any third-party
              providers used within our platform.
            </li>
            <li>
              We are not responsible for disruptions or issues arising from
              third-party services.
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
          <li>
            Follow all applicable laws and regulations while using the service.
          </li>
          <li>Keep your account secure and protect your login credentials.</li>
          <li>
            Refrain from using the platform for fraudulent, spam, or malicious
            activities.
          </li>
          <li>
            Respect the intellectual property rights of game developers and
            other users.
          </li>
          <li>Report any security vulnerabilities or issues responsibly.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Software License',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>Our software is open-sourced under the MIT License:</p>
        <ul className='ml-4 list-disc space-y-2'>
          <li>You are free to use, modify, and distribute the software.</li>
          <li>The software is provided without warranties of any kind.</li>
          <li>
            Please include the original license and copyright notice in any
            redistribution.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Community Guidelines',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>When participating in our community, you agree to:</p>
        <ul className='ml-4 list-disc space-y-2'>
          <li>Follow our established code of conduct.</li>
          <li>Engage constructively in community discussions.</li>
          <li>Respect other members and their contributions.</li>
          <li>Report any behavior that violates community standards.</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Contact Information',
    content: (
      <div className='mt-4 space-y-3 text-muted-foreground'>
        <p>
          For any questions or concerns regarding these terms, feel free to
          reach out:
        </p>
        <div className='flex flex-col space-y-2'>
          <a
            href='https://github.com/techwithanirudh/ai-tutor/issues'
            className='inline-flex items-center text-fd-primary underline duration-300 hover:text-fd-primary/70'
          >
            <Github className='mr-2 h-4 w-4' />
            Open an issue on GitHub
          </a>
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
