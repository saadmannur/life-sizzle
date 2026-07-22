import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
    FaXTwitter,
    FaPhone,
    FaEnvelope,
    FaLocationDot,
} from "react-icons/fa6";

const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
    { href: "https://x.com", label: "X", Icon: FaXTwitter },
    { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
    { href: "https://wa.me", label: "WhatsApp", Icon: FaWhatsapp },
];

const quickLinksLeft = [
    { href: "/about", label: "About us" },
    { href: "/public-lessons", label: "Public Lessons" },
    { href: "/dashboard/my-lessons", label: "My Lessons" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Support" },
];

const quickLinksRight = [
    { href: "/dashboard", label: "Overview" },
    { href: "/pricing", label: "Pricing Plan" },
    { href: "/dashboard/favorites", label: "My Favorites" },
    { href: "/faq", label: "Faq's" },
];

const SectionHeading = ({ children }) => (
    <div className="mb-6">
        <h3 className="text-lg font-bold text-[#26313B]">{children}</h3>
        <span className="mt-2 flex gap-1">
            <span className="h-1 w-2 rounded-full bg-[#E2636B]/40"></span>
            <span className="h-1 w-2 rounded-full bg-[#E2636B]/40"></span>
            <span className="h-1 w-6 rounded-full bg-[#E2636B]"></span>
        </span>
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="container mx-auto grid grid-cols-1 gap-12 px-5 py-16 md:grid-cols-3">
                {/* Brand + description + socials */}
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2636B]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className="text-2xl font-extrabold text-[#26313B]">
                            Life<span className="text-[#E2636B]">Sizzle</span>
                        </span>
                    </Link>

                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#6B7684]">
                        Empowering people with practical digital knowledge for a smarter, safer, and more connected life.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        {socialLinks.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2636B] text-white transition-opacity hover:opacity-90"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <div>
                    <SectionHeading>Quick Links</SectionHeading>
                    <div className="grid grid-cols-2 gap-4">
                        <ul className="space-y-4">
                            {quickLinksLeft.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm font-medium text-[#26313B] hover:text-[#E2636B]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-4">
                            {quickLinksRight.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm font-medium text-[#26313B] hover:text-[#E2636B]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact info */}
                <div>
                    <SectionHeading>Contact Us</SectionHeading>
                    <p className="max-w-xs text-sm leading-relaxed text-[#6B7684]">
                        Have a question, a lesson to report, or feedback for us? Reach out anytime.
                    </p>
                    <ul className="mt-5 space-y-4">
                        <li className="flex items-center gap-3 text-sm text-[#26313B]">
                            <FaPhone className="h-4 w-4 text-[#E2636B]" />
                            <span>(+880) 1XXX-XXXXXX</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#26313B]">
                            <FaEnvelope className="h-4 w-4 text-[#E2636B]" />
                            <span>hello@lifesizzle.com</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-[#26313B]">
                            <FaLocationDot className="h-4 w-4 text-[#E2636B]" />
                            <span>Chattogram, Bangladesh</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#26313B]/10 bg-[#FBF6EC]">
                <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-5 py-5 text-sm text-[#6B7684] md:flex-row">
                    <p>
                        Copyright © {new Date().getFullYear()} <span className="font-semibold text-[#26313B]">LifeSizzle</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy-policy" className="hover:text-[#E2636B]">
                            Privacy Policy
                        </Link>
                        <span className="text-[#26313B]/20">|</span>
                        <Link href="/terms-and-conditions" className="hover:text-[#E2636B]">
                            Terms &amp; Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;