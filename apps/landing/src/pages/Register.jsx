import { useRef } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import { API_BASE_URL, AUTH_STORAGE_KEYS, DASHBOARD_URL } from '../config/api';

function Register() {

    const usernameRef = useRef();
    const mailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const signup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const fullName = usernameRef.current?.value.trim();
        const email = mailRef.current?.value.trim().toLowerCase();
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!fullName || fullName.length < 2) {
            setErrorMessage('Full name must be at least 2 characters.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!password || password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            const registerUrl = `${API_BASE_URL}/auth/register`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(registerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json')
                ? await response.json()
                : { message: await response.text() };

            if (!response.ok) {
                console.error('Register failed:', data);
                throw new Error(data?.message || 'Register failed');
            }

            localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, data.accessToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, data.refreshToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(data.user));
            window.name = `mm-auth:${btoa(
                encodeURIComponent(
                    JSON.stringify({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        user: data.user,
                    }),
                ),
            )}`;
            window.location.href = DASHBOARD_URL;
        } catch (error) {
            console.error("Signup error:", error);
            if (error?.name === 'AbortError') {
                setErrorMessage('Request timed out. Please check your network/CORS and try again.');
                return;
            }
            if (error?.message === 'Failed to fetch') {
                setErrorMessage(`Network/CORS blocked. Add this origin in backend CORS_ORIGIN: ${window.location.origin}`);
                return;
            }
            setErrorMessage(error?.message || 'Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            eyebrow="Create account"
            title="Build your financial profile in minutes"
            subtitle="Set up your account, then move straight into budgeting, savings tracking, and clearer decisions."
            footerText="Already have an account?"
            footerLinkText="Login"
            footerLinkTo="/login"
        >
            <form onSubmit={signup} className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-200">
                        Full name
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={usernameRef}
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/60 focus:bg-white/[0.08]"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        ref={mailRef}
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/60 focus:bg-white/[0.08]"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-200">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            ref={passwordRef}
                            placeholder="At least 8 characters"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/60 focus:bg-white/[0.08]"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-yellow-300"
                        >
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
                                    <path d="M9.88 5.09A10.45 10.45 0 0 1 12 4.75c5.33 0 9.07 4.02 10.5 7.25a1.4 1.4 0 0 1 0 1c-.44.98-1.15 2.09-2.11 3.14" />
                                    <path d="M6.72 6.72A11.67 11.67 0 0 0 1.5 12c1.43 3.23 5.17 7.25 10.5 7.25 1.6 0 3.06-.28 4.35-.77" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M2.5 12s3.5-7.5 9.5-7.5 9.5 7.5 9.5 7.5-3.5 7.5-9.5 7.5S2.5 12 2.5 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-200">
                        Confirm password
                    </label>
                    <div className="relative">
                        <input
                            ref={confirmPasswordRef}
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="Repeat your password"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/60 focus:bg-white/[0.08]"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((value) => !value)}
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-yellow-300"
                        >
                            {showConfirmPassword ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
                                    <path d="M9.88 5.09A10.45 10.45 0 0 1 12 4.75c5.33 0 9.07 4.02 10.5 7.25a1.4 1.4 0 0 1 0 1c-.44.98-1.15 2.09-2.11 3.14" />
                                    <path d="M6.72 6.72A11.67 11.67 0 0 0 1.5 12c1.43 3.23 5.17 7.25 10.5 7.25 1.6 0 3.06-.28 4.35-.77" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M2.5 12s3.5-7.5 9.5-7.5 9.5 7.5 9.5 7.5-3.5 7.5-9.5 7.5S2.5 12 2.5 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3.5 text-base font-bold text-dark-100 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>

                {errorMessage ? <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{errorMessage}</p> : null}
            </form>
        </AuthShell>
    );
}

export default Register;
