import type { Metadata } from 'next';
import { PricingSection } from './components/pricing-section';

const title = 'Simple, transparent pricing';
const description =
  'No hidden fees. No surprises. 15-day trial. Cancel anytime.';

export const metadata: Metadata = {
  title: "Pricing",
  description,
};

export default function PricingPage() {
  return <PricingSection title={"title"} description={description} />;
}
