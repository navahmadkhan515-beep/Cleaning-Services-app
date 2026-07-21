import { useParams, Link } from 'react-router-dom'
import { HiOutlineCheckCircle, HiArrowLeft } from 'react-icons/hi'
import Button from '../components/ui/Button'
import { services } from './Services'

const checklist = [
  'Dusting all surfaces, fixtures, and furniture',
  'Vacuuming and mopping all floors',
  'Kitchen counters, sink, and exterior of appliances',
  'Bathroom sanitizing, top to bottom',
  'Trash removal and liner replacement',
]

const ServiceDetails = () => {
  const { serviceId } = useParams()
  const service = services.find((s) => s.id === serviceId)

  if (!service) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 py-24 text-center sm:px-8">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <p className="text-muted">The service you're looking for doesn't exist or was moved.</p>
        <Button to="/services" variant="primary">Back to Services</Button>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary">
        <HiArrowLeft /> Back to Services
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={26} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{service.name}</h1>
          <p className="mt-1 font-mono text-sm font-semibold text-primary">{service.price}</p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
        {service.description} Our team arrives fully equipped, follows a
        consistent room-by-room checklist, and leaves your space ready for
        guests, clients, or just a well-earned rest.
      </p>

      <div className="mt-10 rounded-2xl border border-ink/10 bg-surface p-7">
        <h2 className="text-lg font-semibold">What's included</h2>
        <ul className="mt-4 space-y-3">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
              <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Button to="/book" variant="accent">Book This Service</Button>
      </div>
    </div>
  )
}

export default ServiceDetails
