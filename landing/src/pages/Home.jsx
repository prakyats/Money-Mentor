import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Small Business Owner",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        text: "Money Mentor helped me take control of my business finances. The insights are invaluable!"
    },
    {
        name: "Michael Chen",
        role: "Freelance Developer",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        text: "The expense tracking feature has completely changed how I manage my income."
    },
    {
        name: "Emily Rodriguez",
        role: "Student",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "Perfect for managing student loans and budgeting. Highly recommended!"
    }
];

function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-5');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card, .testimonial-card').forEach(element => {
            element.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-600');
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <div className="bg-gradient-to-br from-secondary to-secondary/95 text-white py-24 rounded-b-[3rem] mb-16 overflow-hidden relative p-10">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 items-center gap-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold mb-6">Welcome to <span className="text-primary">Money Mentor</span></h1>
                            <p className="text-xl mb-8">Your trusted companion for smart financial decisions</p>
                            <div className="space-x-4">
                                <Link to="/register" className="inline-block bg-primary text-secondary font-semibold px-8 py-3 rounded-lg hover:bg-accent transform hover:-translate-y-0.5 transition-all">
                                    Get Started
                                </Link>
                                <Link to="/login" className="inline-block border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-accent hover:border-accent hover:text-secondary transform hover:-translate-y-0.5 transition-all">
                                    Login
                                </Link>
                            </div>
                        </div>
                        <div className="relative mt-8 lg:mt-0">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80"
                                    alt="Financial Planning"
                                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute bottom-8 right-8 bg-white/95 p-6 rounded-2xl shadow-lg text-secondary">
                                    <div className="text-center">
                                        <i className="bi bi-people-fill text-3xl text-primary mb-2"></i>
                                        <h4 className="text-2xl font-bold">10K+</h4>
                                        <p className="text-gray-600">Active Users</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center mb-16">Why Choose Money Mentor?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: "graph-up-arrow",
                            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
                            title: "Track Expenses",
                            description: "Monitor your spending habits with easy-to-use tools"
                        },
                        {
                            icon: "target",
                            image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=400&q=80",
                            title: "Set Goals",
                            description: "Create and achieve your financial objectives"
                        },
                        {
                            icon: "lightbulb",
                            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
                            title: "Smart Insights",
                            description: "Get personalized financial recommendations"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="feature-card bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="relative">
                                <div className="absolute top-6 right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10">
                                    <i className={`bi bi-${feature.icon} text-2xl text-secondary`}></i>
                                </div>
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-48 object-cover transform hover:scale-110  duration-700 ease-in-out"
                                />
                                <div className="p-6 bg-white">
                                    <h3 className="text-xl font-semibold text-secondary mb-4">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 py-24 mt-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card bg-white p-8 rounded-2xl shadow-lg">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 border-3 border-primary p-0.5"
                                />
                                <h4 className="text-xl font-semibold text-center mb-2">{testimonial.name}</h4>
                                <p className="text-gray-500 text-center mb-4">{testimonial.role}</p>
                                <p className="text-gray-600 text-center">{testimonial.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="mt-20 text-center py-8">
                <p>&copy; 2025 Money Mentor. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;