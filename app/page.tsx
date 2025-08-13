"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { StatCounter } from "../src/components/StatCounter";
import MintButton from "../components/MintButton";
import { CourseCard } from "../components/CourseCard";
import coursesData from "../data/courses.json";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
      {/* Gradient corner effects */}
      <div className="pointer-events-none absolute top-0 right-0 w-[45rem] h-[45rem] bg-gradient-radial from-violet-800/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[45rem] h-[45rem] bg-gradient-radial from-indigo-900/40 to-transparent" />
      {/* Subtle ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-violet-800/15 blur-[120px]"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-indigo-900/15 blur-[110px]"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>')",
        }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="" width={34} height={34} />
              <span className="font-semibold tracking-tight">
                CodeForSuccess
              </span>
            </div>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300 font-semibold">
                <a className="hover:text-white transition" href="#">
                  Home
                </a>
                <a className="hover:text-white transition" href="#courses">
                  Courses
                </a>
                <Link className="hover:text-white transition" href="/practice">
                  Practice
                </Link>
                <a className="hover:text-white transition" href="#callback">
                  Request Callback
                </a>
              </nav>
              <a
                href="#signin"
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 shadow-lg shadow-violet-900/20 transition-all"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero centered in viewport (like your screenshot but cleaner) */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative min-h-[calc(100vh-64px)] grid place-items-center -mt-16">
          <div className="grid w-full grid-cols-1 items-center md:grid-cols-12">
            {/* Headline centered block */}
            <div className="md:col-span-8 md:col-start-3 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl text-6xl font-semibold leading-[1.3] mb-8 tracking-tight sm:text-7xl lg:text-8xl"
              >
                We turn <span className="text-emerald-400">complex</span> into
                simple
                <br className="hidden sm:block" /> and simple into{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 inline-block py-4 leading-none">
                  mastery
                </span>
                .
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mx-auto mt-6 max-w-2xl text-base text-neutral-400"
              >
                Get ready to ace your interviews with battle‑tested tracks in
                DSA & System Design.
                <br className="hidden sm:block" />
                No fluff. Just outcomes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <GradientButton href="#courses">
                  Check Courses-Make an Impact
                </GradientButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="-mt-24 mb-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3 text-center w-full max-w-[1400px] mx-auto px-8 py-8">
            <StatCounter value={25} suffix="k+" label="Students taught" />
            <StatCounter value={95} suffix="%" label="Success Rate" />
            <StatCounter value={562} suffix="K+" label="Youtube Subs." />
          </div>
        </section>

        {/* Sub-CTA banner */}
        <section className="py-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 sm:p-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-2xl" />
            <div className="relative grid items-center gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  A structured path from basics to offers
                </h2>
                <p className="mt-2 text-neutral-300">
                  Solve curated sheets, learn patterns, build design instincts,
                  and measure progress with mock interviews.
                </p>
              </div>
              <div className="flex sm:justify-end">
                <a
                  href="#get-started"
                  className="rounded-full bg-white px-5 py-3 text-neutral-900 font-medium hover:opacity-90 transition"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Additional stats and tagline section */}
        <section className="py-16 text-center">
          <div className="text-4xl sm:text-5xl font-semibold leading-tight max-w-4xl mx-auto px-4">
            We see the potential in you, and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              we won't stop until you see it too.
            </span>
          </div>
        </section>

        {/* Video section */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 relative">
              <iframe
                src="https://www.youtube.com/embed/NooFfEDWIEw"
                title="You Are Not Yet Ready | Placements | Open Source"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <a
              href="https://www.youtube.com/@GenieAshwani/videos"
              target="_blank"
              className="inline-block mt-40 px-6 py-3 text-base font-medium text-neutral-900 bg-[#2FEAAA] rounded-full hover:opacity-90 transition-all duration-200"
            >
              Explore free learning
            </a>
          </div>
        </section>

        {/* New Courses Section */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-semibold mb-12 text-white text-center">
              Courses Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesData.map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-16 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-10 text-white">
              <span className="text-white">200+ Students Placed At</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
              {[
                "accenture.webp",
                "accolite.png",
                "amazon.png",
                "adobe.png",
                "microsoft.png",
                "americanExpress.png",
                "booking.webp",
                "jio.png",
                "oracle.webp",
                "nagarro.webp",
                "paytm.webp",
                "bandhanBank.webp",
                "ibm.png",
                "paytm.webp",
                "tcs.webp",
                "urban-company.webp",
                "deutsche_telekom.png",
                "tcs.webp",
                "expediagroup.png",
              ].map((logo, i) => (
                <img
                  key={i}
                  src={`/img/${logo}`}
                  alt="Company Logo"
                  className="h-10 w-auto object-contain rounded bg-white p-2 grayscale hover:grayscale-0 transition duration-300"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Modern Multi-Column Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-neutral-200">
          {/* Social/Logo Column */}
          <div className="flex flex-col items-start md:items-start gap-6">
            <img
              src="/img/placeholder/footer/logo.svg"
              alt="Logo"
              className="w-14 h-14 mb-2"
            />
            <span className="text-sm mb-2">Let's connect with our socials</span>
            <div className="flex gap-5">
              <a href="#">
                <img
                  src="/img/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a href="#">
                <img
                  src="/img/placeholder/footer/linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a href="#">
                <img
                  src="/img/placeholder/footer/discord.svg"
                  alt="Discord"
                  className="w-6 h-6"
                />
              </a>
              <a href="#">
                <img src="/img/youtube.png" alt="YouTube" className="w-6 h-6" />
              </a>
              <a href="#">
                <img
                  src="/img/placeholder/footer/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-base">COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms and Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing and Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hire From Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Submit Projects
                </a>
              </li>
            </ul>
          </div>
          {/* Community Links */}
          <div>
            <h3 className="font-bold mb-4 text-white text-base">COMMUNITY</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-white text-base">
              Get In Touch
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+919691778470" className="hover:underline">
                  +91 9691778470
                </a>
              </li>
              <li>
                <a href="tel:+918109161752" className="hover:underline">
                  +91 8109161752
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@sheryians.com"
                  className="hover:underline"
                >
                  hello@sheryians.com
                </a>
              </li>
              <li>
                23-B, Indrapuri Sector C,
                <br />
                Bhopal(MP), 462021
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 text-center py-6 text-neutral-300 text-sm">
          Copyright © {new Date().getFullYear()} Sheryians Pvt. Ltd.
          <br />
          All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

function EmGradient({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block font-serif italic">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        {children}
      </span>
      <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-emerald-400/70 to-cyan-400/70" />
    </span>
  );
}

function GhostLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 text-neutral-300 transition hover:text-white"
    >
      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-[length:100%_2px]">
        {children}
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-70 group-hover:opacity-100 transition"
      >
        <path
          d="M5 12h14m0 0-6-6m6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function GradientButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center justify-center rounded-full px-6 py-3 font-medium text-neutral-900"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 blur transition group-hover:opacity-30" />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
