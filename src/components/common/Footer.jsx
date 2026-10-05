import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
  IconBrandYoutube,
  IconArrowUp,
} from "@tabler/icons-react";

const contacts = [
  { Icon: IconMapPin, text: "Chennai, Tamil Nadu, India", top: true },
  { Icon: IconMail, text: "support@edith.com" },
  { Icon: IconPhone, text: "+91 98765 43210" },
];

const columns = {
  Shop: [
    "All Products",
    "New Arrivals",
    "Best Sellers",
    "Offers",
    "Categories",
  ],
  "Customer Support": [
    "Contact Us",
    "Track Order",
    "Shipping & Delivery",
    "Returns & Refunds",
    "FAQs",
  ],
  Company: [
    "About Us",
    "Careers",
    "Privacy Policy",
    "Terms & Conditions",
    "Cookie Policy",
  ],
};

const socials = [
  { Icon: IconBrandInstagram, label: "Instagram" },
  { Icon: IconBrandFacebook, label: "Facebook" },
  { Icon: IconBrandX, label: "X" },
  { Icon: IconBrandYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                EDITH
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
                A modern shopping experience built for discovering products you
                love.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              {contacts.map(({ Icon, text, top }) => (
                <div
                  key={text}
                  className={`flex gap-3 ${top ? "items-start" : "items-center"}`}
                >
                  <Icon
                    size={19}
                    stroke={1.8}
                    className={`shrink-0 ${top ? "mt-0.5" : ""}`}
                  />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shop / Customer Support / Company */}
          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="mt-12 flex flex-col gap-6 border-t border-gray-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Stay connected</h3>
            <p className="mt-1 text-sm text-gray-400">
              Follow us for product updates and offers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <Icon size={20} stroke={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:px-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} EDITH. All rights reserved.
          </p>

          <button
            type="button"
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-white"
          >
            <span>Back to top</span>
            <IconArrowUp size={15} stroke={1.8} />
          </button>

          <p className="text-xs text-gray-500">
            Powered by{" "}
            <span className="font-semibold text-gray-300">@EdithTech</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
