import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-blue-900 opacity-50"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Healthcare <br />
                            <span className="text-teal-400">Reimagined.</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                            Experience the future of medical scheduling. Book appointments with top specialists in seconds, not minutes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/doctors"
                                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30"
                            >
                                Find a Doctor
                            </Link>
                            <Link
                                to="/departments"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold text-lg transition-all"
                            >
                                Explore Departments
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-20 relative z-20">
                    {[
                        { title: 'Expert Doctors', desc: 'Access to over 50+ certified specialists.', icon: '👨‍⚕️' },
                        { title: 'Instant Booking', desc: 'Real-time availability and instant confirmation.', icon: '📅' },
                        { title: '24/7 Support', desc: 'Round-the-clock support for all your needs.', icon: '🎧' },
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 text-center">
                <div className="bg-teal-50 rounded-3xl p-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Trusted by thousands of patients</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Patients', value: '10k+' },
                            { label: 'Doctors', value: '50+' },
                            { label: 'Departments', value: '12' },
                            { label: 'Years', value: '25' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
                                <div className="text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
