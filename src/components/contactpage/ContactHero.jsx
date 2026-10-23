import contactHeroImage from "../../assets/placeholders/ContactHero.svg";
import Breadcrumb from "../Breadcrumb";
const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f3eb]">
      {/* Soft decorative background */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#d4a64c]/[0.04] blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#8b5e34]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* Breadcrumb */}
       <Breadcrumb currentPage="Contact Us" />

        <div className="grid min-h-[390px] grid-cols-1 items-center lg:grid-cols-[0.92fr_1.08fr]">
          {/* LEFT */}
          <div className="relative z-10 py-12 lg:py-14">
            <p className="mb-4 font-serif text-[13px] uppercase tracking-[0.28em] text-[#9b6b2f]">
              Connect With ShriTattvam
            </p>

            <h1 className="font-serif text-[44px] leading-[1.05] text-[#19130e] sm:text-[52px] lg:text-[58px]">
              Contact Us
            </h1>

            {/* Gold divider */}
            <div className="my-6 flex items-center gap-2">
              <span className="h-px w-14 bg-[#b78943]" />

              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-2 w-2 rotate-45 border border-[#b78943]" />
                <span className="h-1 w-1 rounded-full bg-[#b78943]" />
              </span>

              <span className="h-px w-8 bg-[#b78943]" />
            </div>

            <h2 className="font-serif text-[20px] text-[#97672e] sm:text-[22px]">
              We would love to hear from you.
            </h2>

            <p className="mt-4 max-w-[470px] text-[13px] leading-7 text-[#625950]">
              Have a question, suggestion, or need assistance? Our team is
              here to help you with anything you need. Whether it is about our
              sacred collections, your order, or anything else, we are always
              happy to assist.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex h-[300px] items-end justify-center lg:h-[390px]">
            {/* Warm image glow */}
            <div className="absolute bottom-5 left-1/2 h-52 w-[80%] -translate-x-1/2 rounded-full bg-[#b78943]/10 blur-3xl" />

            <img
              src={contactHeroImage}
              alt="ShriTattvam sacred pooja essentials"
              className="relative z-10 h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;