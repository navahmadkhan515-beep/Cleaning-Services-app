import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiCheckCircle,
} from "react-icons/hi";
import SectionHeading from "../components/ui/SectionHeading";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    // simulate network latency so the loading state is visible; replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.log("Contact form submitted:", data);
    toast.success("Message sent — we'll be in touch shortly!");
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Questions before you book?"
        description="Send us a message and our team will get back to you within one business day."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-6">
            <a
              href="https://maps.google.com/?q=123+Meadow+Lane+Springfield"
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <HiOutlineLocationMarker size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">Address</p>
                <p className="text-sm text-muted transition group-hover:text-primary">
                  123 Meadow Lane, Springfield
                </p>
              </div>
            </a>

            <a href="tel:+15550102938" className="group flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <HiOutlinePhone size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">Phone</p>
                <p className="text-sm text-muted transition group-hover:text-primary">
                  (555) 010-2938
                </p>
              </div>
            </a>

            <a
              href="mailto:hello@sparkleandco.com"
              className="group flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <HiOutlineMail size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="text-sm text-muted transition group-hover:text-primary">
                  hello@sparkleandco.com
                </p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HiOutlineClock size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">Office hours</p>
                <p className="text-sm text-muted">Mon–Sat, 8:00am–6:00pm</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-muted">
              Looking to book a cleaning instead of asking a question?{" "}
              <a
                href="/book"
                className="font-semibold text-primary hover:underline"
              >
                Skip the form and book directly →
              </a>
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col gap-5 rounded-2xl border border-ink/10 bg-surface p-7 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                aria-invalid={!!errors.name}
                className={`rounded-lg border bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                  errors.name ? "border-red-400" : "border-ink/15"
                }`}
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
                aria-invalid={!!errors.email}
                className={`rounded-lg border bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                  errors.email ? "border-red-400" : "border-ink/15"
                }`}
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors.email?.type === "required" && (
                <span className="text-xs text-red-500">Email is required</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-xs text-red-500">
                  Enter a valid email
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={500}
              aria-invalid={!!errors.message}
              className={`resize-none rounded-lg border bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.message ? "border-red-400" : "border-ink/15"
              }`}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-xs text-red-500">Message is required</span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending...
              </>
            ) : sent ? (
              <>
                <HiCheckCircle size={16} /> Sent
              </>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
