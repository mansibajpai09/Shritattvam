import React, { useState } from "react";

const faqs = [
  {
    question: "What are your store timings?",
    answer:
      "Our customer support team is available Monday to Saturday from 10:00 AM to 7:00 PM.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Eligible products can be returned according to our return policy. Please contact our support team with your order details for assistance.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery generally takes a few business days depending on your location. You will receive tracking information once your order is dispatched.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive tracking details through your registered contact information.",
  },
  {
    question: "Do you ship all over India?",
    answer:
      "Yes. ShriTatvam products can be delivered across India, subject to service availability at your location.",
  },
  {
    question: "Do you offer bulk orders?",
    answer:
      "Yes. We welcome bulk and gifting enquiries. Please contact us with your requirements and our team will assist you.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">
      <div className="rounded-lg border border-[#e8ddd0] bg-[#fcfaf6] px-4 py-7 sm:px-6 lg:px-7">
        {/* Heading */}
        <div>
          <h2 className="font-serif text-[22px] text-[#211912] sm:text-[24px]">
            Frequently Asked Questions
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <span className="h-px w-8 bg-[#b78943]" />

            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute h-1.5 w-1.5 rotate-45 border border-[#b78943]" />
            </span>

            <span className="h-px w-5 bg-[#b78943]" />
          </div>
        </div>

        {/* FAQ grid */}
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-md border border-[#e8ddd0] bg-[#faf7f1] transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[11px] font-medium text-[#342a21]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center text-[17px] font-light text-[#6d6258] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#e8ddd0] px-4 pb-4 pt-3 text-[10px] leading-5 text-[#756b62]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;