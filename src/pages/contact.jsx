
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ContactHero from "../components/contactpage/ContactHero";
import ContactInfo from "../components/contactpage/Contactinfo";
import ContactForm from "../components/contactpage/ContactForm";
import FAQSection from "../components/contactpage/FAQSection";
import ServiceHighlights from "../components/contactpage/ServiceHighlights";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#211912]">
      <Navbar />

      <main>
        {/* Hero */}
        <ContactHero />

        {/* Contact information + form */}
        <section className="mx-auto max-w-[1400px] px-5 pb-2 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[215px_1fr] xl:grid-cols-[220px_1fr]">
            <ContactInfo />

            <ContactForm />
          </div>
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Benefits strip */}
        <ServiceHighlights />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;