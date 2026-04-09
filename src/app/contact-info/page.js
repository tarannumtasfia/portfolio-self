"use client";

import Link from "next/link";
import {
    
    ArrowRight,
   
} from "lucide-react";

const contactItems = [
    {
        icon: null,
        imgSrc: "/linkedin-icon.png",
        label: "LinkedIn",
        value: "linkedin.com/in/tasfiatarannum",
        href: "https://linkedin.com/in/tasfiatarannum",
        isLink: true,
        
    },
    {
        icon: null,
        imgSrc: "/globe-icon.png",
        label: "Portfolio",
        value: "portfolio-self-alpha-ten.vercel.app",
        href: "https://portfolio-self-alpha-ten.vercel.app",
        isLink: true,
       
    },
    {
        icon: null,
        imgSrc: "/book-icon.png",
        label: "Blog",
        value: "https://medium.com/@tasfiatarannum",
        href: "https://medium.com/@tasfiatarannum",
        isLink: true,
        
    },
    {
        icon: null,
        imgSrc: "/call-icon.png",
        label: "Phone",
        value: "+8801701442277",
        href: "tel:+8801701442277",
        isLink: true,
        
    },
    {
        icon: null,
        imgSrc: "/location-icon.png",
        label: "Address",
        value: "Block-A, Aftabnagar, Rampura, Dhaka, Bangladesh",
        href: "https://www.google.com/maps?q=bti+Chorus,+Dhaka,+Bangladesh",
        isLink: true,
        
    },
    {
        icon: null,
        imgSrc: "/mail-icon.png",
        label: "Email",
        value: "tasfiatarannum@yahoo.com",
        href: "mailto:tasfiatarannum@yahoo.com",
        isLink: true,
        accent: "#3e0097",
    },
];

export default function ContactInfo() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-24">
            {/* Decorative blobs */}
            <div
                aria-hidden
                className="pointer-events-none fixed top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #3e0097, transparent)" }}
            />
            <div
                aria-hidden
                className="pointer-events-none fixed bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
            />

            {/* Card */}
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/60">
                {/* Header banner */}
                <div
                    className="relative h-28 flex items-end px-7 pb-4"
                    style={{
                        background:
                            "linear-gradient(135deg, #3e0097 0%, #6d28d9 60%, #818cf8 100%)",
                    }}
                >
                    {/* Subtle pattern */}
                    <svg
                        className="absolute inset-0 w-full h-full opacity-10"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="dots"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                            >
                                <circle cx="2" cy="2" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>

                    <h1 className="relative text-white text-2xl font-bold tracking-tight drop-shadow">
                        Contact Info
                    </h1>
                </div>

                {/* Avatar bump */}
                <div className="relative px-7 pt-0 pb-2">
                    <div className="absolute -top-10 right-7 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-indigo-100">
                        <img
                            src="/logo.png"
                            alt="Tasfia Tarannum"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="pt-4 pb-2">
                        <p className="text-lg font-bold text-[#3e0097]">Tasfia Tarannum</p>
                        <p className="text-sm text-gray-500 font-medium">Applicant</p>
                    </div>
                </div>

                <hr className="border-gray-100 mx-7" />

                {/* Contact rows */}
                <ul className="px-7 py-5 space-y-5">
                    {contactItems.map(({ icon: Icon, label, imgSrc, value, href, accent }) => (
                        <li key={label} className="flex items-start gap-4 group">
                            <span
                                className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                                style={imgSrc ? { background: "#f1f5f9" } : { background: accent + "15", color: accent }}
                            >
                                {imgSrc ? (
                                    <img src={imgSrc} alt={label} className="w-7 h-7 object-contain" />
                                ) : (
                                    <Icon size={17} />
                                )}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                                    {label}
                                </p>
                                <a
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="text-sm font-medium text-gray-800 hover:text-[#3e0097] transition-colors break-words"
                                >
                                    {value}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <hr className="border-gray-100 mx-7" />

                {/* CTA */}
                <div className="px-7 py-6">
                    <p className="text-sm text-gray-500 mb-4">
                        Want to reach out directly? Send me a message and I'll get back to
                        you soon.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all"
                        style={{
                            background:
                                "linear-gradient(135deg, #3e0097 0%, #6d28d9 100%)",
                        }}
                    >
                        Send me a message
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </main>
    );
}