import { HiCheck } from 'react-icons/hi'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'

const plans = [
  {
    id: 'basic',
    name: 'Basic Clean',
    price: '$60',
    cadence: '/visit',
    description: 'A quick refresh for smaller spaces.',
    features: ['Up to 2 rooms', 'Dusting & vacuuming', 'Kitchen & bathroom wipe-down', 'Trash removal'],
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard Clean',
    price: '$90',
    cadence: '/visit',
    description: 'Our most popular plan for full homes.',
    features: ['Up to 4 rooms', 'Everything in Basic', 'Interior windows', 'Baseboards & fixtures', 'Recurring discount'],
    featured: true,
  },
  {
    id: 'deep',
    name: 'Deep Clean',
    price: '$130',
    cadence: '/visit',
    description: 'Top-to-bottom clean for move-ins or big resets.',
    features: ['Unlimited rooms', 'Everything in Standard', 'Inside cabinets & appliances', 'Grout & tile detailing'],
    featured: false,
  },
]

const Pricing = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Pricing"
        title="Simple plans, no hidden fees"
        description="Every plan includes background-checked cleaners and our spotless-guarantee."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col rounded-2xl border p-7 ${
              plan.featured
                ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20 sm:-translate-y-3'
                : 'border-ink/10 bg-surface'
            }`}
          >
            {plan.featured && (
              <span className="mb-4 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">
                Most popular
              </span>
            )}
            <h3 className={`text-lg font-semibold ${plan.featured ? 'text-white' : 'text-ink'}`}>
              {plan.name}
            </h3>
            <p className={`mt-1 text-sm ${plan.featured ? 'text-white/75' : 'text-muted'}`}>
              {plan.description}
            </p>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-semibold">{plan.price}</span>
              <span className={plan.featured ? 'text-white/70' : 'text-muted'}>{plan.cadence}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <HiCheck className={`mt-0.5 shrink-0 ${plan.featured ? 'text-accent' : 'text-primary'}`} />
                  <span className={plan.featured ? 'text-white/90' : 'text-ink/80'}>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              to="/book"
              variant={plan.featured ? 'accent' : 'outline'}
              className="mt-8 w-full"
            >
              Choose {plan.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
