"use client";

export function Navigation() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500" />
            <span className="font-semibold tracking-tight">
              CodeForSuccess
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
            <a className="hover:text-white transition" href="#">
              Home
            </a>
            <a className="hover:text-white transition" href="#courses">
              Courses
            </a>
            <a className="hover:text-white transition" href="#cohort">
              Cohort 4.0
            </a>
            <a className="hover:text-white transition" href="#callback">
              Request Callback
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#signin"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
