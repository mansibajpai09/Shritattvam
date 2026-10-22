import React from "react";

const services = [
  {
    icon: "♧",
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: "▣",
    title: "Secure Payment",
    description: "100% Safe & Secure",
  },
  {
    icon: "⟳",
    title: "Easy Returns",
    description: "Hassle Free Returns",
  },
  {
    icon: "♢",
    title: "COD Available",
    description: "Cash on Delivery",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="rounded-xl border border-[#eee1d1] bg-[#fbf7f1] px-5 py-6 sm:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex items-center gap-4 lg:justify-center"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-[#a66d22]">
              {service.icon}
            </span>

            <div>
              <h3 className="text-sm font-semibold text-stone-900">
                {service.title}
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;