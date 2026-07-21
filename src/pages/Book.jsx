import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCalendar } from "react-icons/hi";
import SectionHeading from "../components/ui/SectionHeading";

const Book = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Booking submitted:", data);
    toast.success("Booking request received — check your email to confirm!", {
      duration: 2000,
    });
    reset();
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Book now"
        title="Schedule your cleaning"
        description="Tell us a bit about your space and preferred time — we'll confirm within the hour."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface p-7 sm:p-9"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              className="rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="service" className="text-sm font-medium">
              Service
            </label>
            <select
              id="service"
              className="rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
              {...register("service", { required: true })}
            >
              <option value="">Select a service</option>
              <option value="deep-clean">Deep Cleaning</option>
              <option value="office-clean">Office Cleaning</option>
              <option value="move-out-clean">Move-Out Cleaning</option>
              <option value="upholstery-clean">Upholstery Cleaning</option>
              <option value="window-clean">Window Cleaning</option>
              <option value="eco-clean">Eco-Friendly Cleaning</option>
            </select>
            {errors.service && (
              <span className="text-xs text-red-500">
                Please select a service
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="date" className="text-sm font-medium">
              Preferred Date
            </label>
            <div className="relative">
              <input
                id="date"
                type="date"
                className="w-full rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
                {...register("date", { required: true })}
              />
              <HiOutlineCalendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
            </div>
            {errors.date && (
              <span className="text-xs text-red-500">Please pick a date</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input
            id="address"
            className="rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-xs text-red-500">Address is required</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="notes" className="text-sm font-medium">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={4}
            className="resize-none rounded-lg border border-ink/15 bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary"
            {...register("notes")}
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent-dark"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Book;
