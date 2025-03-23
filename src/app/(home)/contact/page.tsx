import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import CTA from '../_components/cta';
import { ContactForm } from './components/contact-form';

export default function Contact(): React.ReactElement {
  return (
    <>
      <Section className='grid divide-y divide-dashed divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0'>
        <div className='flex flex-col gap-2 px-6 py-10 md:py-14'>
          <h4 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
            Contact
          </h4>
          <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
            Let us know if you have any questions or feedback. We are here to
            help you.
          </p>
        </div>

        <div className='flex w-full items-center px-6 py-10 md:py-14'>
          <ContactForm />
        </div>
      </Section>
      <CTA />
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const description =
    'Contact us for any inquiries, feedback, or support. We are here to assist you.';

  return createMetadata({
    title: 'Contact',
    description,
    openGraph: {
      url: '/contact',
    },
    alternates: {
      canonical: '/contact',
    },
  });
}
