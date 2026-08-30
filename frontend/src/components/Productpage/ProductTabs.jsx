import React, { useState } from "react";

const tabs = [
  "Description",
  "Specifications",
  "What's Included",
  "Shipping & Returns",
  "Reviews (101)",
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <section className="mt-12">
      <div className="overflow-x-auto border-b border-stone-200">
        <div className="flex min-w-max gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap pb-4 text-sm transition ${
                activeTab === tab
                  ? "font-semibold text-stone-950"
                  : "text-stone-600 hover:text-stone-950"
              }`}
            >
              {tab}

              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-stone-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-10 py-8 lg:grid-cols-[1.5fr_0.7fr]">
        <div>
          {activeTab === "Description" && (
            <div className="space-y-5 text-sm leading-7 text-stone-700">
              <p>
                Elevate your spiritual experience with the Divine Pooja Kit
                (Small). Crafted from premium quality brass, this kit includes
                all the essential items required for daily prayers and rituals.
              </p>

              <p>
                Each piece is carefully designed to bring divinity and serenity
                to your home. Perfect for home temples, festivals, and special
                occasions.
              </p>

              <div className="grid grid-cols-2 gap-5 pt-3 sm:grid-cols-4">
                {[
                  ["♧", "Made with pure brass"],
                  ["◎", "Handcrafted by artisans"],
                  ["✥", "Traditional & authentic"],
                  ["✓", "Long lasting & durable"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center"
                  >
                    <span className="text-2xl text-[#b77725]">{icon}</span>
                    <span className="mt-2 text-xs text-stone-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Specifications" && (
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["Material", "Premium Brass"],
                ["Product Type", "Pooja Kit"],
                ["Size", "Small"],
                ["Finish", "Traditional Brass Finish"],
                ["Usage", "Daily Pooja & Rituals"],
                ["Packaging", "Premium Eco-Friendly Packaging"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-stone-100 py-3"
                >
                  <span className="font-medium text-stone-600">{label}</span>
                  <span className="text-right text-stone-900">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "What's Included" && (
            <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              {[
                "Brass Pooja Thali",
                "Brass Diya",
                "Brass Bell",
                "Roli & Kumkum Containers",
                "Camphor Holder",
                "Pooja Accessories",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-[#b77725]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "Shipping & Returns" && (
            <div className="space-y-4 text-sm leading-7 text-stone-700">
              <p>
                Free shipping is available on orders above ₹999.
              </p>
              <p>
                Products are securely packaged to ensure safe delivery.
                Returns are accepted according to the applicable return
                policy.
              </p>
            </div>
          )}

          {activeTab === "Reviews (101)" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-stone-950">
                  4.8
                </span>
                <div>
                  <div className="text-[#c48421]">★★★★★</div>
                  <p className="text-xs text-stone-500">
                    Based on 101 reviews
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-[#faf6f0] p-5 text-sm text-stone-700">
                Beautiful quality and perfect for daily pooja.
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-[#fbf7f1] p-6">
          <ul className="space-y-5 text-sm text-stone-700">
            <li className="flex gap-3">
              <span className="text-lg text-[#b77725]">☼</span>
              Enhances positive energy
            </li>

            <li className="flex gap-3">
              <span className="text-lg text-[#b77725]">♧</span>
              Perfect for gifting
            </li>

            <li className="flex gap-3">
              <span className="text-lg text-[#b77725]">♢</span>
              Brings peace & prosperity
            </li>

            <li className="flex gap-3">
              <span className="text-lg text-[#b77725]">♧</span>
              Eco-friendly packaging
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;