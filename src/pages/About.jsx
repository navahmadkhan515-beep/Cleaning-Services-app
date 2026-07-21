import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineBadgeCheck,
  HiOutlineHeart,
} from "react-icons/hi";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

const values = [
  {
    icon: HiOutlineBadgeCheck,
    title: "Consistency",
    text: "The same checklist, every visit, from every cleaner on our team.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Trained team",
    text: "Every cleaner completes paid onboarding and ongoing training.",
  },
  {
    icon: HiOutlineHeart,
    title: "Care for your space",
    text: "We treat every home and office like our own.",
  },
];

const milestones = [
  {
    year: "2015",
    title: "One mop, one client",
    text: "Founded with a single cleaner and a simple promise: show up on time, do the job right.",
  },
  {
    year: "2018",
    title: "First team hires",
    text: "Brought on our first trained cleaners and wrote down the checklist we still use today.",
  },
  {
    year: "2021",
    title: "Expanded to 10 cities",
    text: "Grew from a local operation into a regional team, without changing the standard.",
  },
  {
    year: "2024",
    title: "18 cities, one guarantee",
    text: "Now serving thousands of homes and offices, still backed by the same satisfaction guarantee.",
  },
];

const stats = [
  { label: "Homes & offices cleaned", value: 12400, suffix: "+" },
  { label: "Trained cleaners", value: 240, suffix: "+" },
  { label: "Cities served", value: 18, suffix: "" },
];

const CountUp = ({ value, suffix = "", duration = 1400 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark clip-swipe px-5 pb-20 pt-16 text-white sm:px-8 sm:pb-28 sm:pt-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Our story
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-balance text-4xl font-bold sm:text-5xl"
          >
            Started with one mop, one client, and a promise.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-white/85">
            Sparkle &amp; Co. began in 2015 with a single cleaner and a simple
            idea: show up on time, do the job right, every time.
          </p>
        </div>
      </section>

      {/* Story + pull quote */}
      <section className="mx-auto -mt-12 max-w-5xl px-5 sm:-mt-16 sm:px-8">
        <div className="grid gap-8 rounded-3xl bg-surface p-8 shadow-xl shadow-ink/5 sm:p-12 lg:grid-cols-[1fr_1px_1fr]">
          <p className="text-base leading-relaxed text-muted">
            Today, we've grown into a team of vetted professionals serving homes
            and offices across 18 cities. What hasn't changed is the checklist
            we started with, and the guarantee that stands behind every visit.
          </p>
          <div className="hidden bg-ink/10 lg:block" />
          <blockquote className="border-l-2 border-primary/30 pl-5 lg:border-l-0 lg:pl-0">
            <p className="text-lg font-medium leading-relaxed text-ink">
              &ldquo;We built this company on the idea that reliability is a
              form of respect for people's time.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-muted">
              Founder, Sparkle &amp; Co.
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Animated stats */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl font-semibold text-primary sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline — a real chronology, so the years earn their place as markers */}
      <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Milestones"
          title="How we got here"
        />

        <div className="relative mt-14">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-ink/10 sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative flex flex-col gap-1 pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute left-4 top-1 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-primary/15 sm:left-auto sm:top-1 ${
                    i % 2 === 0
                      ? "sm:right-0 sm:translate-x-1/2"
                      : "sm:left-0 sm:-translate-x-1/2"
                  }`}
                />
                <span className="font-mono text-sm font-semibold text-primary">
                  {m.year}
                </span>
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="What we stand for"
          title="The values behind every visit"
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-surface p-6 transition-shadow hover:shadow-lg hover:shadow-ink/5"
            >
              <value.icon size={28} className="text-primary" />
              <h3 className="font-display text-lg font-semibold">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary-dark px-6 py-14 text-center text-white sm:px-16">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
            Want to see it for yourself?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/book" variant="accent">
              Book a Cleaning
            </Button>
            <Button
              to="/careers"
              variant="outline"
              className="border-white/40 text-white hover:border-white hover:text-white"
            >
              Join the Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
