import React, { useState } from "react";

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M21 3 10.5 13.5" />
    <path d="m21 3-6.7 18-3.8-7.5L3 9.7 21 3Z" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="5" y="10" width="14" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend/API can be connected here later.
    console.log("Contact form submitted:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const inputClass =
    "w-full rounded-md border border-[#e7ddd1] bg-[#fbf8f3] px-3.5 py-3 text-[12px] text-[#2b2118] outline-none transition-all duration-300 placeholder:text-[#92877c] focus:border-[#b78943] focus:bg-white focus:ring-1 focus:ring-[#b78943]/20";

  return (
    <div className="rounded-lg border border-[#e8ddd0] bg-[#fcfaf6] p-5 shadow-[0_10px_35px_rgba(66,43,20,0.035)] sm:p-6">
      {/* Heading */}
      <div>
        <h2 className="font-serif text-[21px] text-[#211912] sm:text-[23px]">
          Send Us a Message
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-px w-8 bg-[#b78943]" />

          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-1.5 w-1.5 rotate-45 border border-[#b78943]" />
          </span>

          <span className="h-px w-5 bg-[#b78943]" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={inputClass}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={inputClass}
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={inputClass}
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className={inputClass}
          />
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          rows="5"
          className={`${inputClass} mt-3 resize-none`}
          required
        />

        <button
          type="submit"
          className="group mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#1a120b] text-[12px] font-medium tracking-wide text-white transition-all duration-300 hover:bg-[#2d1d10] hover:shadow-[0_8px_25px_rgba(40,24,10,0.18)]"
        >
          <SendIcon />

          <span>Send Message</span>
        </button>

        {submitted && (
          <p className="mt-3 text-center text-[11px] text-[#8c672e]">
            Thank you. Your message has been received.
          </p>
        )}

        {/* Privacy */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-[#7c736b]">
          <LockIcon />

          <span>
            Your information is safe with us. We respect your privacy.
          </span>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;