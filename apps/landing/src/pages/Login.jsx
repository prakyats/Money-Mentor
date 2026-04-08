import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, AUTH_STORAGE_KEYS, DASHBOARD_URL } from '../config/api';

function Login() {
    const mailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const signin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const email = mailRef.current?.value.trim().toLowerCase();
        const password = passwordRef.current?.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!password || password.length < 8) {
            setErrorMessage("Password must be at least 8 characters.");
            return;
        }

        try {
            setLoading(true);
            const loginUrl = `${API_BASE_URL}/auth/login`;
            console.log('LOGIN REQUEST URL:', loginUrl);

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const contentType = response.headers.get('content-type') || '';
            const data = contentType.includes('application/json')
                ? await response.json()
                : { message: await response.text() };

            if (!response.ok) {
                console.error('Login failed:', data);
                throw new Error(data?.message || 'Invalid email or password. Please try again.');
            }

            localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, data.accessToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, data.refreshToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(data.user));
            window.location.href = DASHBOARD_URL;
        } catch (error) {
            console.error("Login failed:", error);
            if (error?.message === 'Failed to fetch') {
                setErrorMessage(`Network/CORS blocked. Add this origin in backend CORS_ORIGIN: ${window.location.origin}`);
                return;
            }
            setErrorMessage(error?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg border">
                <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
                <form onSubmit={signin}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email address
                        </label>
                        <input
                            ref={mailRef}
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            ref={passwordRef}
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-secondary font-semibold py-3 rounded-lg hover:bg-accent transition-colors"
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center mt-3">{errorMessage}</p>
                    )}
                    <p className="text-center mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-accent">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
