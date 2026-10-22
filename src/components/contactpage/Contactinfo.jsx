import React from "react";

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.6 2.8 9.1 2c.8-.2 1.6.2 1.9.9l1.2 2.9c.3.7.1 1.5-.5 2l-1.5 1.2a12.7 12.7 0 0 0 6.7 6.7l1.2-1.5c.5-.6 1.3-.8 2-.5l2.9 1.2c.7.3 1.1 1.1.9 1.9l-.8 2.5c-.3 1-1.2 1.7-2.2 1.7C11.2 20.9 3.1 12.8 3.1 2.8c0-1 .7-1.9 1.7-2.2Z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.1-4.1A8.5 8.5 0 1 1 20.5 11.5Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.3 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.7.8c.6 1.2 1.5 2.1 2.7 2.7l.8-.7c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.4.4-2.4 0-1-.4-2.1-1-3.1-2-1-.9-1.7-2-2.1-3-.4-1-.2-2 0-2.3Z"
    />
  </svg>
);

const contactItems = [
  {
    title: "Call Us",
    value: "+91 8299829846",
    description: "Mon - Sat | 10:00 AM - 7:00 PM",
    icon: <PhoneIcon />,
  },
  {
    title: "Email Us",
    value: "shritattvam@gmail.com",
    description: "We reply within 24 hours",
    icon: <MailIcon />,
  },
  {
    title: "WhatsApp",
    value: "+91 8299829846",
    description: "Quick assistance on WhatsApp",
    icon: <WhatsAppIcon />,
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-3">
      {contactItems.map((item) => (
        <div
          key={item.title}
          className="group flex min-h-[88px] items-center gap-4 rounded-lg border border-[#e8ddd0] bg-[#fcfaf6] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c9a05a] hover:shadow-[0_12px_30px_rgba(77,51,24,0.08)]"
        >
          {/* Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1b130c] text-[#d9ad5e] shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-105">
            {item.icon}
          </div>

          {/* Content */}
          <div>
            <h3 className="font-sans text-[13px] font-semibold text-[#261d15]">
              {item.title}
            </h3>

            <p className="mt-1 text-[12px] font-medium text-[#33271d]">
              {item.value}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-[#7a7067]">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;