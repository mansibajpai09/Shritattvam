
const TrustBanner = () => {
  const items = [
    {
      icon: "✥",
      title: "100% Authentic",
      text: "Sourced from trusted artisans",
    },
    {
      icon: "♧",
      title: "Premium Quality",
      text: "Finest materials & craftsmanship",
    },
    {
      icon: "☼",
      title: "Spiritual & Sacred",
      text: "Designed for divine connection",
    },
    {
      icon: "♧",
      title: "Trusted by Thousands",
      text: "Loved by 50,000+ customers",
    },
  ];

  return (
    <section className="mt-12 rounded-xl bg-[#21150c] px-5 py-7 text-white sm:px-8">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 lg:justify-center"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c99342] text-2xl text-[#d9a452]">
              {item.icon}
            </span>

            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-stone-300">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBanner;