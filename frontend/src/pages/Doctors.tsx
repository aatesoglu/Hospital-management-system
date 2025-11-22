import React, { useEffect, useState } from 'react';
import { getDoctors, getDepartments } from '../api/services';
import { type Doctor, type Department } from '../types';
import { useSearchParams, Link } from 'react-router-dom';

const Doctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const selectedDeptId = searchParams.get('department');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [docs, depts] = await Promise.all([
                    getDoctors(selectedDeptId ? Number(selectedDeptId) : undefined),
                    getDepartments()
                ]);
                setDoctors(docs);
                setDepartments(depts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedDeptId]);

    const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ department: value });
        } else {
            setSearchParams({});
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Find a Specialist</h1>
                    <p className="text-slate-600 mt-2">Book appointments with top doctors in your area.</p>
                </div>

                <div className="relative">
                    <select
                        value={selectedDeptId || ''}
                        onChange={handleDeptChange}
                        className="appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-6 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer min-w-[250px]"
                    >
                        <option value="">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {doctors.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                    <p className="text-xl text-slate-500">No doctors found in this department.</p>
                    <button
                        onClick={() => setSearchParams({})}
                        className="mt-4 text-teal-600 font-semibold hover:underline"
                    >
                        View all doctors
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                            <div className="p-8 flex flex-col items-center text-center border-b border-slate-50 bg-gradient-to-b from-white to-slate-50">
                                <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">
                                    👨‍⚕️
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{doc.name}</h2>
                                <p className="text-teal-600 font-medium mb-2">{doc.specialization}</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                    {doc.department?.name}
                                </span>
                            </div>

                            <div className="p-6 mt-auto">
                                <Link
                                    to={`/book/${doc.id}`}
                                    className="block w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-center rounded-xl font-semibold transition-colors shadow-lg shadow-teal-200"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Doctors;
