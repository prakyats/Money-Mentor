import { useRef } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, AUTH_STORAGE_KEYS, DASHBOARD_URL } from '../config/api';

function Register() {

    const usernameRef = useRef();
    const mailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const signup = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log('REGISTER CLICKED');

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
            console.log('REGISTER REQUEST URL:', registerUrl);

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
        <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg border">
                <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
                <form onSubmit={signup}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            ref={usernameRef}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={mailRef}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-secondary font-semibold py-3 rounded-lg hover:bg-accent transition-colors"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center mt-3">{errorMessage}</p>
                    )}
                    <p className="text-center mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-accent">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
