import { HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi'

const bookings = [
  { id: 1, service: 'Standard Clean', date: 'Jul 24, 2026', status: 'Confirmed' },
  { id: 2, service: 'Window Cleaning', date: 'Aug 02, 2026', status: 'Pending' },
  { id: 3, service: 'Deep Clean', date: 'Jun 30, 2026', status: 'Completed' },
]

const statusStyles = {
  Confirmed: 'bg-primary/10 text-primary',
  Pending: 'bg-accent/20 text-accent-dark',
  Completed: 'bg-ink/5 text-muted',
}

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-muted">Here's an overview of your upcoming and past bookings.</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HiOutlineCalendar size={20} />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono">2</p>
            <p className="text-sm text-muted">Upcoming</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent-dark">
            <HiOutlineClock size={20} />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono">1</p>
            <p className="text-sm text-muted">Pending</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink/5 text-muted">
            <HiOutlineCheckCircle size={20} />
          </div>
          <div>
            <p className="text-2xl font-semibold font-mono">14</p>
            <p className="text-sm text-muted">Completed</p>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-base text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 font-medium">{booking.service}</td>
                <td className="px-6 py-4 font-mono text-muted">{booking.date}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
