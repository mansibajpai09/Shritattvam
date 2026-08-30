import React from "react";

const TruckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M12 3 20 6v5c0 5.2-3.4 8.6-8 10-4.6-1.4-8-4.8-8-10V6l8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ReturnIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M4 7h13" />
    <path d="m14 4 3 3-3 3" />
    <path d="M20 17H7" />
    <path d="m10 14-3 3 3 3" />
  </svg>
);

const SupportIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
    <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
    <path d="M9 20h4" />
  </svg>
);

const services = [
  {
    title: "Free Shipping",
    subtitle: "On Orders above ₹999",
    icon: <TruckIcon />,
  },
  {
    title: "Secure Payments",
    subtitle: "100% Safe & Secure",
    icon: <ShieldIcon />,
  },
  {
    title: "Easy Returns",
    subtitle: "Hassle Free Returns",
    icon: <ReturnIcon />,
  },
  {
    title: "Dedicated Support",
    subtitle: "We're Here for You",
    icon: <SupportIcon />,
  },
];

const ServiceHighlights = () => {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-lg bg-[#1b1209] shadow-[0_12px_35px_rgba(35,20,8,0.12)]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group flex items-center gap-3 px-4 py-5 sm:px-6 ${
                index !== 0
                  ? "border-l border-[#8d672f]/25"
                  : ""
              } ${
                index >= 2
                  ? "border-t border-[#8d672f]/25 lg:border-t-0"
                  : ""
              }`}
            >
              <div className="shrink-0 text-[#d4a64c] transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              <div>
                <h3 className="font-serif text-[11px] text-[#f4e5c6] sm:text-[12px]">
                  {service.title}
                </h3>

                <p className="mt-1 text-[8px] tracking-wide text-[#bca987] sm:text-[9px]">
                  {service.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;