import { InlineLink } from '@/components/inline-link';
import { Section } from '@/components/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faq = [
  {
    question: 'What is SaasCN?',
    answer:
      'SaasCN is a comprehensive business operations platform that helps companies streamline their workflows, automate processes, and scale efficiently. Our solutions are designed for businesses of all sizes.',
  },
  {
    question: 'How secure is the platform?',
    answer:
      'We implement enterprise-grade security measures, including end-to-end encryption, regular security audits, and compliance with industry standards. Your data security is our top priority.',
  },
  {
    question: 'Can I integrate with other tools?',
    answer:
      'Yes! SaasCN offers extensive integration capabilities with popular business tools and services. Our API and webhook system allows for seamless connection with your existing tech stack.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'We offer flexible pricing tiers designed to scale with your business needs, from starter plans for small teams to enterprise solutions for large organizations. Check our pricing page for detailed information.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'Our dedicated support team is available 24/7 through multiple channels including live chat, email, and phone. We also provide extensive documentation and training resources.',
  },
];

export const FAQ = () => (
  <Section className='grid divide-y divide-dashed divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0'>
    <div className='flex flex-col gap-2 px-6 py-10 md:py-14'>
      <h4 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
        Frequently Asked Questions
      </h4>
      <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
        Still have questions?{' '}
        <InlineLink href='/contact' className='no-underline'>
          Contact Us
        </InlineLink>
      </p>
    </div>

    <Accordion
      type='single'
      collapsible
      className='w-full divide-dashed divide-border'
    >
      {faq.map((item, index) => (
        <AccordionItem
          key={`${item.question}-${index}`}
          value={`index-${index}`}
        >
          <AccordionTrigger className='rounded-none px-4 hover:bg-card hover:no-underline data-[state=open]:bg-card'>
            {item.question}
          </AccordionTrigger>
          <AccordionContent className='p-4'>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </Section>
);
