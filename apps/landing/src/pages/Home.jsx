import React from 'react';
import { Link } from 'react-router-dom';

const featureCards = [
    {
        title: 'Track everything in one place',
        text: 'See spending, savings, and goals together without jumping between spreadsheets or apps.',
        accent: 'from-yellow-400/25 to-transparent',
    },
    {
        title: 'Make better decisions faster',
        text: 'Built-in insights surface what matters so users can act before small mistakes become big ones.',
        accent: 'from-amber-400/20 to-transparent',
    },
    {
        title: 'Stay on plan without friction',
        text: 'A calm workflow keeps money management simple, readable, and easy to return to every day.',
        accent: 'from-white/10 to-transparent',
    },
];

const steps = [
    {
        step: '01',
        title: 'Create your profile',
        text: 'Set your income, savings target, and financial priorities in minutes.',
    },
    {
        step: '02',
        title: 'Log your spending',
        text: 'Add transactions as they happen and keep your budget grounded in reality.',
    },
    {
        step: '03',
        title: 'Review clear insights',
        text: 'Use trend cards, charts, and goal progress to see where money is going.',
    },
];

const faqs = [
    {
        question: 'Who is Money Mentor for?',
        answer: 'Anyone who wants a clearer picture of their finances, from students and freelancers to households and small business owners.',
    },
    {
        question: 'Does it work on mobile?',
        answer: 'Yes. The landing page and dashboard are built to stay readable and easy to use on small screens first.',
    },
    {
        question: 'Can I start without any setup?',
        answer: 'Yes. You can sign up quickly and fill in the financial profile later if you want to explore first.',
    },
];

function Home({ onHeroCtaVisibilityChange }) {
    const [openFaq, setOpenFaq] = React.useState(0);
    const heroCtaRef = React.useRef(null);

    React.useEffect(() => {
        const target = heroCtaRef.current;

        if (!target || typeof onHeroCtaVisibilityChange !== 'function') {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                onHeroCtaVisibilityChange(entry.isIntersecting ? false : true);
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -45% 0px',
            },
        );

        observer.observe(target);
        onHeroCtaVisibilityChange(false);

        return () => observer.disconnect();
    }, [onHeroCtaVisibilityChange]);

    return (
        <main className="pt-28 text-white sm:pt-24 lg:pt-24">
            <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
                <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
                    <div className="space-y-6 sm:space-y-7">
                        <div className="space-y-1 sm:hidden">
                            <p className="text-xl font-black uppercase tracking-[0.42em] text-yellow-200">
                                Money Mentor
                            </p>
                            <p className="text-sm font-medium tracking-[0.08em] text-gray-400">
                                Your financial command center
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200">
                            <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.95)]" />
                            Built for clarity
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <h1 className="max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl xl:text-[4.9rem] xl:leading-[0.92]">
                                <span className="block">One place to</span>
                                <span className="block text-yellow-300">see your money</span>
                                <span className="block">clearly.</span>
                            </h1>
                            <p className="max-w-xl text-sm leading-7 text-gray-300 sm:text-lg sm:leading-8">
                                Money Mentor brings budgeting, savings, and decision-making into one clear view so users can see where their money is going and what to do next.
                            </p>
                        </div>

                        <div ref={heroCtaRef} className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/register"
                                className="inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-3.5 text-base font-bold text-dark-100 transition hover:bg-yellow-300 sm:w-auto"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-yellow-400/35 hover:bg-white/10 sm:w-auto"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            {[
                                ['98%', 'Users say the dashboard is easier to understand than spreadsheets'],
                                ['4 min', 'Typical setup time for first-time onboarding'],
                                ['24/7', 'Available anytime on desktop and mobile'],
                            ].map(([value, label]) => (
                                <div key={value} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur sm:p-4">
                                    <p className="text-xl font-black text-yellow-300 sm:text-2xl">{value}</p>
                                    <p className="mt-2 text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            <section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/80">Features</p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
                        Built to help people actually stay on top of their money.
                    </h2>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {featureCards.map((card) => (
                        <article key={card.title} className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 sm:p-6">
                            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} />
                            <h3 className="text-lg font-bold text-white sm:text-xl">{card.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-gray-300">{card.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
                <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/80">How it works</p>
                        <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
                            Clear steps. No clutter. Just a steady money workflow.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                            The landing page is intentionally simple: explain the value fast, show the product honestly, and make it obvious where to begin.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {steps.map((item) => (
                            <div key={item.step} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:p-5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-xs font-black text-yellow-200 sm:h-14 sm:w-14 sm:text-sm">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-300 sm:leading-7">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faq" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/80">FAQ</p>
                    <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
                        Questions people usually ask before they sign up.
                    </h2>
                </div>

                <div className="mt-8 space-y-4">
                    {faqs.map((faq, index) => {
                        const open = openFaq === index;

                        return (
                            <button
                                key={faq.question}
                                type="button"
                                onClick={() => setOpenFaq(open ? -1 : index)}
                                className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition hover:border-yellow-400/30 sm:px-6 sm:py-5"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-bold text-white sm:text-lg">{faq.question}</span>
                                    <span className="text-2xl font-light text-yellow-200">{open ? '−' : '+'}</span>
                                </div>
                                {open ? <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-300">{faq.answer}</p> : null}
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-18 pt-6 sm:px-6 lg:px-8">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-200/80">Ready to begin</p>
                            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-4xl">
                                Start with a clear view of your money today.
                            </h2>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                                Sign up to create your profile, set your goals, and unlock the dashboard built for a calmer way to manage finances.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                            <Link to="/register" className="inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-3.5 text-base font-bold text-dark-100 transition hover:bg-yellow-300 sm:w-auto">
                                Sign Up
                            </Link>
                            <Link to="/login" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-yellow-400/35 hover:bg-white/10 sm:w-auto">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
                © 2026 Money Mentor. Built for clearer financial decisions.
            </footer>
        </main>
    );
}

export default Home;