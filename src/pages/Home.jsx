import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { FaBroom, FaBuilding, FaBoxOpen, FaStar } from "react-icons/fa";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

const services = [
  {
    id: "deep-clean",
    icon: FaBroom,
    name: "Deep Cleaning",
    description: "A thorough, top-to-bottom clean for every room in your home.",
  },
  {
    id: "office-clean",
    icon: FaBuilding,
    name: "Office Cleaning",
    description:
      "Recurring cleaning plans that keep your workspace guest-ready.",
  },
  {
    id: "move-out-clean",
    icon: FaBoxOpen,
    name: "Move-Out Cleaning",
    description: "A spotless handover clean for move-ins and move-outs.",
  },
];

const stats = [
  { label: "Homes cleaned", value: 12400, suffix: "+" },
  { label: "Average rating", value: 4.9, suffix: "/5", decimals: 1 },
  { label: "Cities served", value: 18, suffix: "" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Homeowner",
    quote:
      "Excellent, thorough service every time — I never have to ask twice.",
  },
  {
    id: 2,
    name: "James K.",
    role: "Property Manager",
    quote: "Reliable and professional team. Scheduling is effortless.",
  },
  {
    id: 3,
    name: "Amina R.",
    role: "Studio Owner",
    quote:
      "My office has never looked better, and the booking flow is painless.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// Animated count-up number, triggers once when scrolled into view
const CountUp = ({ value, suffix = "", decimals = 0, duration = 1400 }) => {
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
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// Signature element: draggable grime -> shine comparison
const ShineSlider = () => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(58); // percentage, starts mostly "after"
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.target.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="w-full max-w-md select-none">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl shadow-2xl shadow-ink/20"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* BEFORE layer (dusty / neglected) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(120,120,110,0.35), transparent 40%), radial-gradient(circle at 70% 60%, rgba(90,90,80,0.3), transparent 45%), linear-gradient(135deg, #9a9a8f, #7d7d72)",
          }}
        >
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:10px_10px]" />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
            Before
          </span>
        </div>

        {/* AFTER layer (clean / bright), clipped to slider position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.6), transparent 45%), linear-gradient(135deg, #eafff9, #b7ece0 60%, #7fd9c4)",
            }}
          >
            <HiOutlineSparkles
              className="absolute left-6 top-6 text-white/90"
              size={22}
            />
            <HiOutlineSparkles
              className="absolute right-10 top-14 text-white/70"
              size={16}
            />
            <HiOutlineSparkles
              className="absolute bottom-16 left-16 text-white/80"
              size={18}
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              After
            </span>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white/90"
          style={{ left: `${pos}%` }}
        >
          <div
            onPointerDown={onPointerDown}
            className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg"
          >
            <HiChevronLeft className="text-ink/60" size={14} />
            <HiChevronRight className="-ml-1.5 text-ink/60" size={14} />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-white/70">
        Drag to see the Sparkle & Co. difference
      </p>
    </div>
  );
};

const Home = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Auto-advance testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Sticky mobile CTA after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark clip-swipe pb-24 pt-16 text-white sm:pb-32 sm:pt-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur"
            >
              <HiOutlineSparkles /> Trusted since 2015
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="max-w-2xl text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            >
              A cleaner space, booked in under two minutes.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="max-w-lg text-balance text-base text-white/85 sm:text-lg"
            >
              Vetted, insured cleaning professionals for homes and offices —
              with flexible scheduling and a spotless-guarantee on every visit.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button to="/book" variant="accent">
                Book a Cleaning
              </Button>
              <Button
                to="/services"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:text-white"
              >
                View Services
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-white/75"
            >
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineShieldCheck className="text-accent" /> Insured &
                background-checked
              </span>
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineSparkles className="text-accent" /> 4.9/5 average
                rating
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <ShineSlider />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-10 max-w-6xl px-5 sm:-mt-14 sm:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-3xl bg-surface p-6 shadow-xl shadow-ink/5 sm:grid-cols-3 sm:p-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-mono text-3xl font-semibold text-primary">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="What we offer"
          title="Cleaning plans built around your space"
          description="Pick a one-off deep clean or a recurring plan — every visit follows the same checklist, every time."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className={`group relative rounded-2xl border p-7 transition-shadow hover:shadow-lg hover:shadow-ink/5 ${
                i === 1
                  ? "border-primary/30 bg-surface ring-1 ring-primary/20"
                  : "border-ink/10 bg-surface"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <service.icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <Link
                to={`/services/${service.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2 hover:underline"
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works — a real sequence, so numbering earns its place here */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Three steps to a spotless space"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Book your slot",
              text: "Pick a service and a time — most first visits are available within 48 hours.",
            },
            {
              step: "02",
              title: "We clean",
              text: "A vetted, insured cleaner follows the same checklist every visit, so results stay consistent.",
            },
            {
              step: "03",
              title: "You relax",
              text: "Not happy with something? We'll come back and re-clean it at no charge.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={i}
              variants={fadeUp}
              className="relative rounded-2xl border border-ink/10 bg-surface p-7"
            >
              <span className="font-mono text-sm font-semibold text-primary/50">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-primary-dark py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Why Sparkle & Co."
            title="Booked fast. Cleaned right. Guaranteed."
            description="Every cleaner is background-checked and every visit is covered by our satisfaction guarantee."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: HiOutlineClock,
                title: "Fast booking",
                text: "Reserve a slot in under two minutes, any day of the week.",
              },
              {
                icon: HiOutlineShieldCheck,
                title: "Vetted & insured",
                text: "Every cleaner is background-checked and fully insured.",
              },
              {
                icon: HiOutlineSparkles,
                title: "Spotless guarantee",
                text: "Not happy? We'll return and re-clean at no charge.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                variants={fadeUp}
                whileHover={{ scale: 1.06 }}
                className="flex flex-col gap-3"
              >
                <item.icon size={28} className="text-accent" />
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — auto-rotating carousel */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Client stories"
          title="What our clients say"
        />

        <div className="mx-auto mt-12 max-w-xl">
          <div className="relative min-h-[180px] rounded-2xl border border-ink/10 bg-surface p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[testimonialIndex].id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                </p>
                <div className="mt-5">
                  <p className="text-sm font-semibold">
                    {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonials[testimonialIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              aria-label="Previous testimonial"
              onClick={() =>
                setTestimonialIndex(
                  (i) => (i - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink/50 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <HiChevronLeft />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() =>
                setTestimonialIndex((i) => (i + 1) % testimonials.length)
              }
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-surface text-ink/50 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <HiChevronRight />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setTestimonialIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === testimonialIndex ? "w-6 bg-primary" : "w-2 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-accent px-6 py-14 text-center sm:px-16">
          <h2 className="text-balance text-3xl font-semibold text-ink sm:text-4xl">
            Ready for a spotless space?
          </h2>
          <p className="max-w-md text-balance text-sm text-ink/70">
            Get a cleaner booked today — most first visits are available within
            48 hours.
          </p>
          <Button to="/book" variant="primary">
            Book Your Cleaning
          </Button>
        </div>
      </section>

      {/* Sticky mobile CTA bar */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ink/10 bg-surface/95 px-5 py-3 shadow-2xl backdrop-blur sm:hidden"
          >
            <div>
              <p className="text-sm font-semibold">Ready to book?</p>
              <p className="text-xs text-muted">Slots open within 48 hours</p>
            </div>
            <Button to="/book" variant="primary" className="whitespace-nowrap">
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
