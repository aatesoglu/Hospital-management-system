import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-teal-500 transition-colors';
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            M
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
                            MediBook
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className={isActive('/')}>Home</Link>
                        <Link to="/departments" className={isActive('/departments')}>Departments</Link>
                        <Link to="/doctors" className={isActive('/doctors')}>Doctors</Link>
                    </nav>

                    <Link
                        to="/doctors"
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-teal-200"
                    >
                        Book Now
                    </Link>
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center text-white font-bold text-sm">M</div>
                                <span className="text-lg font-bold text-white">MediBook</span>
                            </div>
                            <p className="text-sm">Modern healthcare scheduling for the digital age.</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Services</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/departments" className="hover:text-teal-400">Departments</Link></li>
                                <li><Link to="/doctors" className="hover:text-teal-400">Find a Doctor</Link></li>
                                <li><a href="#" className="hover:text-teal-400">Emergency</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-teal-400">About Us</a></li>
                                <li><a href="#" className="hover:text-teal-400">Careers</a></li>
                                <li><a href="#" className="hover:text-teal-400">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-teal-400">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-sm">
                        &copy; {new Date().getFullYear()} MediBook System. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
