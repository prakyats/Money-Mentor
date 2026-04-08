import React from 'react';
import { Link } from 'react-router-dom';

function AuthShell({ title, eyebrow, subtitle, children, footerText, footerLinkText, footerLinkTo }) {
  return (
    <main className="min-h-screen pt-6 text-white sm:pt-8">
      <div className="mx-auto grid min-h-screen max-w-7xl items-stretch gap-8 px-4 pb-12 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-8">
        <section className="hidden overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.26)] backdrop-blur-xl lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-lg font-black text-yellow-300">₹</span>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-200/80">Money Mentor</p>
                <p className="text-xs text-gray-400">Financial clarity, without friction</p>
              </div>
            </Link>

            <div className="max-w-xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-200/80">{eyebrow}</p>
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h1>
              <p className="text-lg leading-8 text-gray-300">{subtitle}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Simple', 'Fast setup and a clear path forward.'],
              ['Trusted', 'Secure auth flow and session handoff.'],
              ['Designed', 'Premium visuals that stay readable on mobile.'],
            ].map(([label, text]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-bold text-yellow-200">{label}</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <div className="mb-8 space-y-2 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3 text-white">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-lg font-black text-yellow-300">₹</span>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-200/80">Money Mentor</p>
                </div>
              </Link>
            </div>

            <div className="mb-8 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-200/80">{eyebrow}</p>
              <h2 className="text-3xl font-black tracking-tight text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
              <p className="text-sm leading-7 text-gray-300 sm:text-base">{subtitle}</p>
            </div>

            {children}

            <div className="mt-6 text-center text-sm text-gray-400">
              {footerText}{' '}
              <Link to={footerLinkTo} className="font-semibold text-yellow-200 transition hover:text-yellow-100">
                {footerLinkText}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthShell;