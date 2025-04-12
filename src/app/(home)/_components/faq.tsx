import { Section } from '@/components/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faq = [
  {
    question: 'What is the platform?',
    answer:
      'The platform is a trading platform that allows you to trade with confidence.',
  },
  {
    question: 'How secure is the platform?',
    answer:
      'Our platform employs enterprise-grade security measures, including end-to-end encryption and multi-factor authentication, to ensure your trading activities remain completely secure.',
  },
  {
    question: 'What trading features are available?',
    answer:
      'The platform offers comprehensive trading tools including real-time market data, advanced charting, automated trading strategies, and detailed analytics to support informed decision-making.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'We offer flexible pricing tiers designed to scale with your business needs, from starter plans for individual traders to enterprise solutions for large organizations.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'Our dedicated support team is available 24/7 through multiple channels including live chat, email, and phone. We also provide extensive documentation and training resources.',
  },
];

export const FAQ = () => (
  <Section className='w-full'>
    <div className='grid divide-y divide-dashed divide-border/70 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-border'>
      <div className='flex flex-col gap-2 px-6 py-10 md:py-14'>
        <h4 className='max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl'>
          Frequently Asked Questions
        </h4>
        <p className='max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg'>
          Still have questions? Contact Us
        </p>
      </div>

      <Accordion
        type='single'
        collapsible
        className='w-full divide-dashed divide-border/70 dark:divide-border'
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
    </div>
  </Section>
);
