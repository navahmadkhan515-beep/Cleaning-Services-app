import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBroom,
  FaBuilding,
  FaBoxOpen,
  FaCouch,
  FaWindowMaximize,
  FaLeaf,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import SectionHeading from "../components/ui/SectionHeading";

export const services = [
  {
    id: "deep-clean",
    icon: FaBroom,
    name: "Deep Cleaning",
    description:
      "A thorough, top-to-bottom clean covering every room, baseboard to ceiling fan. Ideal for seasonal resets or a home that hasn\u2019t had a deep clean in a while.",
    price: "From $130",
    includes: [
      "Baseboards & window sills",
      "Inside oven & fridge",
      "Ceiling fans & vents",
      "Cabinet fronts",
    ],
  },
  {
    id: "office-clean",
    icon: FaBuilding,
    name: "Office Cleaning",
    description:
      "Recurring plans that keep desks, common areas, and restrooms guest-ready between visits from your team and clients.",
    price: "From $90",
    includes: [
      "Desks & common areas",
      "Restrooms & kitchenette",
      "Trash & recycling",
      "Flexible after-hours slots",
    ],
  },
  {
    id: "move-out-clean",
    icon: FaBoxOpen,
    name: "Move-Out Cleaning",
    description:
      "A complete handover clean so you get your deposit back, stress-free — built around typical landlord checklists.",
    price: "From $150",
    includes: [
      "Full appliance interiors",
      "Cabinets & closets",
      "Wall spot-cleaning",
      "Move-in ready guarantee",
    ],
  },
  {
    id: "upholstery-clean",
    icon: FaCouch,
    name: "Upholstery Cleaning",
    description:
      "Steam and stain treatment for sofas, rugs, and fabric furniture, safe for households with kids and pets.",
    price: "From $80",
    includes: [
      "Steam extraction",
      "Stain pre-treatment",
      "Pet-safe products",
      "Same-day drying",
    ],
  },
  {
    id: "window-clean",
    icon: FaWindowMaximize,
    name: "Window Cleaning",
    description:
      "Interior and exterior window and sill cleaning, streak-free, including hard-to-reach upper floors.",
    price: "From $60",
    includes: [
      "Interior & exterior glass",
      "Sills & tracks",
      "Screens wiped down",
      "Streak-free finish",
    ],
  },
  {
    id: "eco-clean",
    icon: FaLeaf,
    name: "Eco-Friendly Cleaning",
    description:
      "Plant-based, non-toxic products for pet- and family-safe homes, with the same checklist as our standard clean.",
    price: "From $110",
    includes: [
      "Plant-based products",
      "Fragrance-free option",
      "Pet & baby safe",
      "Same deep-clean checklist",
    ],
  },
];

const Services = () => {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Services"
        title="Every kind of clean, one booking flow"
        description="Pick a service to see exactly what's included — pricing and checklist stay the same whether it's a one-off or a recurring plan."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* Service index / menu */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {services.map((service) => {
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:shrink lg:w-full ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                    : "border-ink/10 bg-surface text-ink hover:border-primary/30"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <service.icon size={16} />
                </span>
                <span className="whitespace-nowrap text-sm font-semibold lg:whitespace-normal">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-ink/10 bg-surface p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <active.icon size={26} />
              </div>

              <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">
                {active.name}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {active.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-ink/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
                <span className="font-mono text-lg font-semibold text-primary">
                  {active.price}{" "}
                  <span className="font-sans text-sm font-normal text-muted">
                    /visit
                  </span>
                </span>
                <Link
                  to={`/services/${active.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Book this service <HiArrowRight />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Services;
