import { baseUrl } from '@/lib/constants';
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface NewsletterWelcomeEmailProps {
  firstName: string;
  posts: {
    title: string;
    description?: string;
    date: Date;
    tags?: string[];
    image?: string;
    author: string;
    url: string;
  }[];
}

function PostCard({
  title,
  description,
  date,
  tags,
  image,
  author,
  url,
}: NewsletterWelcomeEmailProps['posts'][0]) {
  return (
    <Section className='my-[16px]'>
      <Link href={url}>
        <Img
          alt='Post image'
          className='w-full rounded-[12px] object-cover'
          height='320'
          src={image ?? `${baseUrl}/images/placeholder.png`}
        />
      </Link>
      <Section className='mt-[24px]'>
        <Link
          href={url}
          className='m-0 mt-[8px] font-semibold text-[32px] text-zinc-900 leading-[36px]'
        >
          {title}
        </Link>
        <Text className='text-[16px] text-zinc-500 leading-[24px]'>
          {description ||
            'Click on the blog post to learn more about this topic.'}
        </Text>
      </Section>
    </Section>
  );
}

export default function NewsletterWelcomeEmail({
  firstName,
  posts,
}: NewsletterWelcomeEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Alex Brush'
          fallbackFontFamily='Georgia'
          webFont={{
            url: 'https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EhUXz7RlNiCY.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
        <Font
          fontFamily='Bricolage Grotesque'
          fallbackFontFamily='Helvetica'
          webFont={{
            url: 'https://fonts.gstatic.com/s/bricolagegrotesque/v8/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInHWVyNJ.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>
        Thanks for joining our newsletter! Get ready to transform your business
        operations.
      </Preview>
      <Tailwind>
        <Body className='bg-white font-sans'>
          <Container className='mx-auto w-full max-w-[600px] p-8'>
            <Section>
              <Text className='mx-0 mt-4 mb-8 p-0 text-center font-normal text-2xl'>
                <span className='font-bold tracking-tighter'>SaasCN</span>
              </Text>
              <Heading className='my-4 font-medium text-4xl leading-tight'>
                Welcome to Better Business Operations!
              </Heading>
              <Text className='text-lg leading-8'>Hey {firstName},</Text>
              <Text className='text-lg leading-8'>
                Thanks for subscribing to our newsletter! We're excited to share
                the latest updates about our business automation platform,
                industry insights, and tips for maximizing your productivity.
              </Text>
              <Text className='text-lg leading-8'>
                Here are some popular articles you might find interesting:
              </Text>
            </Section>

            <Hr className='my-4' />

            <Section className='my-[16px]'>
              {posts.length > 0 ? (
                posts.map((post) => <PostCard key={post.url} {...post} />)
              ) : (
                <Text className='text-[16px] text-zinc-500 leading-[24px]'>
                  Stay tuned for upcoming content!
                </Text>
              )}
            </Section>

            <Hr className='my-4' />

            <Section>
              <Text className='text-lg text-zinc-900 leading-8'>
                Thank you for being a part of our community! We look forward to
                helping you streamline your business operations and achieve
                greater efficiency.
              </Text>
              <Text
                className='select-none text-4xl text-zinc-900 leading-8'
                style={{ fontFamily: 'Alex Brush' }}
              >
                The SaasCN Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewsletterWelcomeEmail.PreviewProps = {
  firstName: 'Jane',
  posts: [
    {
      title: 'Next.js Pages',
      description:
        'Dive into the details of Next.js Pages with examples, dynamic routing, pre-rendering strategies like Static Generation and SSR, and pro tips for building fast, SEO-friendly web apps. Packed with insights and tricks from my latest project!',
      date: new Date('2025-03-21'),
      tags: ['Next.js', 'Pages', 'Routing'],
      image: `${baseUrl}/images/blog/pages.png`,
      author: 'You',
      url: `${baseUrl}/blog/pages`,
    },
    {
      title: 'Markdown Examples',
      description:
        'Learn to use Markdown for clean, structured formatting in blogs, docs, and notes. Explore examples, pro tips, and practical use cases to level up your writing and make your content easier to read, share, and maintain across platforms.',
      date: new Date('2025-03-22'),
      tags: ['Markdown', 'Docs', 'Writing'],
      image: `${baseUrl}/images/blog/markdown-examples.png`,
      author: 'You',
      url: `${baseUrl}/blog/markdown-examples`,
    },
    {
      title: 'Using MDX',
      description:
        'Learn MDX in Next.js to mix Markdown with React. This guide shows setup with @next/mdx, usage tips, and examples to embed JSX in posts—ideal for blogs, docs, and interactive tutorials.',
      date: new Date('2025-03-23'),
      tags: ['MDX', 'Next.js', 'React'],
      image: `${baseUrl}/images/blog/using-mdx.png`,
      author: 'You',
      url: `${baseUrl}/blog/using-mdx`,
    },
  ],
} satisfies NewsletterWelcomeEmailProps;
