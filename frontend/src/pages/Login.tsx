import React from "react";

function Input({
  label,
  type = "text",
  placeholder,
  right,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  right?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-700">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </label>
  );
}

function SocialButton({
  brand,
}: {
  brand: "google" | "apple";
}) {
  const isGoogle = brand === "google";
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition"
    >
      {isGoogle ? (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white">
          {/* Google G (simple) */}
          <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.1 1.53 7.5 2.8l5.1-5.1C33.6 4.4 29.3 2.5 24 2.5 14.8 2.5 6.9 7.9 3.1 15.7l6.3 4.9C11.1 14.5 17 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.4c-.3 2-1.9 5-5.4 7l6.6 5.1C42.8 34.1 46 29.7 46 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M9.4 28.6c-.4-1.2-.7-2.5-.7-4s.3-2.8.7-4l-6.3-4.9C1.6 18.7 1 21.6 1 24.6s.6 5.9 2.1 8.9l6.3-4.9z"
            />
            <path
              fill="#34A853"
              d="M24 46.5c5.3 0 9.8-1.8 13.1-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.5 2-7 0-12.9-5-14.6-11.8l-6.3 4.9C6.9 41.1 14.8 46.5 24 46.5z"
            />
          </svg>
        </span>
      ) : (
        <span className="grid h-5 w-5 place-items-center">
          {/* Apple logo (simple) */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.7 13.2c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.7.8-3.4 2-1.5 2.5-.4 6.2 1.1 8.2.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2 .8-1.1 1.1-2.2 1.1-2.2-.1 0-2.7-1-2.7-4.4ZM14.7 6.7c.6-.7 1-1.7.9-2.7-.9.1-2 .6-2.6 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2Z"
            />
          </svg>
        </span>
      )}
      <span>{isGoogle ? "Login with Google" : "Login with Apple"}</span>
    </button>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-sm md:grid-cols-2 md:rounded-3xl md:my-10 md:min-h-[calc(100vh-80px)]">
        {/* LEFT: Gradient promo panel */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500" />
          {/* soft blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-24 h-96 w-96 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="pointer-events-none absolute left-10 bottom-[-120px] h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div>
              <div className="text-xs font-medium text-white/80">You can easily</div>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
                Speed up your work
                <br />
                with our Web App
              </h1>
            </div>

            <div className="text-xs text-white/70">
              <div className="mb-3">Our partners</div>
              <div className="flex flex-wrap items-center gap-4 opacity-90">
                <span className="rounded-full bg-white/15 px-3 py-1">Discord</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Instagram</span>
                <span className="rounded-full bg-white/15 px-3 py-1">Spotify</span>
                <span className="rounded-full bg-white/15 px-3 py-1">YouTube</span>
                <span className="rounded-full bg-white/15 px-3 py-1">TikTok</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Get Started Now
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Please login to your account to continue.
            </p>

            <form className="mt-8 space-y-4">
              <Input label="Name" placeholder="Enter your name..." />
              <Input
                label="Email address"
                type="email"
                placeholder="workmail@gmail.com"
              />
              <Input
                label="Password"
                type="password"
                placeholder="************"
                right={
                  <button
                    type="button"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Show
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                  />
                  I agree to the Terms &amp; Privacy
                </label>

                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                Login
              </button>

              <div className="text-center text-xs text-slate-500">
                Have an account?{" "}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Signup
                </a>
              </div>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-xs text-slate-400">Or</div>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SocialButton brand="google" />
                <SocialButton brand="apple" />
              </div>
            </form>

            {/* 모바일일 때 왼쪽 패널 느낌을 살짝 */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white md:hidden">
              <div className="text-xs text-white/80">You can easily</div>
              <div className="mt-2 text-xl font-bold leading-snug">
                Speed up your work
                <br />
                with our Web App
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
