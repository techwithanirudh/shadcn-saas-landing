import { env } from '@/env';

export interface PricingTier {
  id: string;
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: {
    href: string;
    label: string;
  };
  highlighted?: boolean;
  popular?: boolean;
}

export const frequencies = ['monthly', 'yearly'];

export const plans: PricingTier[] = [
  {
    id: 'individuals',
    name: 'Starter',
    price: {
      monthly: 'Free',
      yearly: 'Free',
    },
    description: 'Perfect for trying out',
    features: [
      '5 Automated workflows',
      'Basic analytics',
      'Community support',
      '2 team members',
      'Core integrations',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
  },
  {
    id: 'teams',
    name: 'Pro',
    price: {
      monthly: 49,
      yearly: 39,
    },
    description: 'For growing teams',
    features: [
      'Unlimited workflows',
      'Advanced analytics',
      'Priority support',
      'Up to 10 team members',
      'All integrations',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
    popular: true,
  },
  {
    id: 'organizations',
    name: 'Business',
    price: {
      monthly: 99,
      yearly: 89,
    },
    description: 'For larger businesses',
    features: [
      'Custom workflows',
      'Advanced security',
      'Dedicated support',
      'Up to 25 team members',
      'Custom integrations',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 'Custom',
      yearly: 'Custom',
    },
    description: 'For large organizations',
    features: [
      'Everything in Business',
      'Unlimited team members',
      'Custom solutions',
      'SLA guarantees',
      'Dedicated success manager',
    ],
    cta: {
      href: '/contact',
      label: 'Contact us',
    },
    highlighted: true,
  },
];

export const groups = [
  {
    name: 'Core Features',
    features: [
      {
        label: 'Team members',
        description: 'Number of users who can access the platform',
        plans: ['2', '10', '25', 'Unlimited'],
      },
      {
        label: 'Automated workflows',
        description: 'Create and run automated business processes',
        plans: ['5', 'Unlimited', 'Unlimited', 'Unlimited'],
      },
      {
        label: 'Analytics dashboard',
        description: 'Track and analyze business metrics',
        plans: ['Basic', 'Advanced', 'Advanced', 'Custom'],
      },
      {
        label: 'API access',
        description: 'Access to our REST API',
        plans: [false, true, true, true],
      },
    ],
  },
  {
    name: 'Security & Support',
    features: [
      {
        label: '2FA authentication',
        description: 'Two-factor authentication for added security',
        plans: [true, true, true, true],
      },
      {
        label: 'SSO integration',
        description: 'Single sign-on with your identity provider',
        plans: [false, false, true, true],
      },
      {
        label: 'Support SLA',
        description: 'Guaranteed response times',
        plans: ['Community', '24h', '12h', '4h'],
      },
      {
        label: 'Custom contract',
        description: 'Tailored agreement for your needs',
        plans: [false, false, true, true],
      },
    ],
  },
  {
    name: 'Integrations',
    features: [
      {
        label: 'Third-party apps',
        description: 'Connect with popular business tools',
        plans: ['Core only', 'All', 'All', 'Custom'],
      },
      {
        label: 'Custom integrations',
        description: 'Build your own integrations',
        plans: [false, false, true, true],
      },
      {
        label: 'Webhooks',
        description: 'Real-time event notifications',
        plans: [false, true, true, true],
      },
    ],
  },
];
