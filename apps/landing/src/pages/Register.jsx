import { useRef } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL, AUTH_STORAGE_KEYS, DASHBOARD_URL } from '../config/api';

function Register() {

    const usernameRef = useRef();
    const mailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const signup = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const fullName = usernameRef.current?.value.trim();
        const email = mailRef.current?.value.trim().toLowerCase();
        const password = passwordRef.current?.value;

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

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/auth/register`,
                { fullName, email, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, response.data.accessToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, response.data.refreshToken);
            localStorage.setItem(AUTH_STORAGE_KEYS.user, JSON.stringify(response.data.user));
            window.location.href = DASHBOARD_URL;
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage("Failed to sign up. Please try again.");
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
