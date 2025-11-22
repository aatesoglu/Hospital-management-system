import React, { useEffect, useState } from 'react';
import { getDepartments } from '../api/services';
import { type Department } from '../types';
import { Link } from 'react-router-dom';

const Departments: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDepartments()
            .then((data) => {
                setDepartments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching departments:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Departments</h1>
                <p className="text-lg text-slate-600">
                    Specialized care provided by expert medical professionals across various disciplines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept) => (
                    <Link
                        to={`/doctors?department=${dept.id}`}
                        key={dept.id}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                    >
                        <div className="h-48 bg-gradient-to-br from-teal-400 to-blue-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <h2 className="text-2xl font-bold mb-1">{dept.name}</h2>
                                <div className="h-1 w-12 bg-white rounded-full group-hover:w-20 transition-all"></div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {dept.description || 'Comprehensive care and state-of-the-art facilities for all your medical needs.'}
                            </p>
                            <div className="flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
                                View Specialists
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Departments;
