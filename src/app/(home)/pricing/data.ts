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
    name: 'Individuals',
    price: {
      monthly: 'Free',
      yearly: 'Free',
    },
    description: 'For your hobby projects',
    features: [
      'Free email alerts',
      '3-minute checks',
      'Automatic data enrichment',
      '10 monitors',
      'Up to 3 seats',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
  },
  {
    id: 'teams',
    name: 'Teams',
    price: {
      monthly: 90,
      yearly: 75,
    },
    description: 'Great for small businesses',
    features: [
      'Unlimited phone calls',
      '30 second checks',
      'Single-user account',
      '20 monitors',
      'Up to 6 seats',
    ],
    cta: {
      href: env.NEXT_PUBLIC_APP_URL,
      label: 'Get started',
    },
    popular: true,
  },
  {
    id: 'organizations',
    name: 'Organizations',
    price: {
      monthly: 120,
      yearly: 100,
    },
    description: 'Great for large businesses',
    features: [
      'Unlimited phone calls',
      '15 second checks',
      'Single-user account',
      '50 monitors',
      'Up to 10 seats',
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
    description: 'For multiple teams',
    features: [
      'Everything in Organizations',
      'Up to 5 team members',
      '100 monitors',
      '15 status pages',
      '200+ integrations',
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
    name: 'Workspace',
    features: [
      {
        label: 'Users',
        description: 'Invite your team to your workspace.',
        plans: [false, 'Unlimited', 'Unlimited', 'Unlimited'],
      },
      {
        label: 'AI Digest',
        description: 'Get a daily digest of your workspace activity.',
        plans: [false, true, true, true],
      },
      {
        label: 'Multifactor authentication',
        description: 'Add an extra layer of security.',
        plans: [false, false, true, true],
      },
      {
        label: 'Advanced SSO',
        description: 'Sign up with custom SAML SSO.',
        plans: [false, false, true, true],
      },
    ],
  },
];
