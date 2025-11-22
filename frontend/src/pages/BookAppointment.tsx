import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctor, getSchedules, createAppointment } from '../api/services';
import { type Doctor, type Schedule } from '../types';

const BookAppointment: React.FC = () => {
    const { doctorId } = useParams<{ doctorId: string }>();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (doctorId) {
            Promise.all([
                getDoctor(Number(doctorId)),
                getSchedules(Number(doctorId))
            ])
                .then(([doc, scheds]) => {
                    setDoctor(doc);
                    setSchedules(scheds);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [doctorId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSchedule || !doctorId) {
            alert('Please select a time slot');
            return;
        }

        setSubmitting(true);
        try {
            await createAppointment(
                {
                    doctor_id: Number(doctorId),
                    schedule_id: selectedSchedule,
                },
                formData
            );
            alert('Appointment booked successfully!');
            navigate('/');
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!doctor) return <div className="text-center py-20 text-xl text-slate-500">Doctor not found</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Sidebar / Doctor Info */}
                <div className="md:w-1/3 bg-slate-900 text-white p-8 flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

                    <div className="mb-8">
                        <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Doctor</div>
                        <div className="text-xl font-bold">{doctor.name}</div>
                        <div className="text-teal-400">{doctor.specialization}</div>
                    </div>

                    <div className="mb-8">
                        <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Department</div>
                        <div>{doctor.department?.name}</div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-slate-800">
                        <div className="text-slate-400 text-sm mb-2">Need Help?</div>
                        <div className="font-semibold">Call 1-800-MEDIBOOK</div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="md:w-2/3 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Complete Your Booking</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Schedule Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-4">Select a Time Slot</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {schedules.length > 0 ? (
                                    schedules.map((schedule) => {
                                        const date = new Date(schedule.start_time);
                                        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                        const dateStr = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

                                        return (
                                            <button
                                                key={schedule.id}
                                                type="button"
                                                onClick={() => setSelectedSchedule(schedule.id)}
                                                className={`p-3 rounded-xl border text-sm transition-all ${selectedSchedule === schedule.id
                                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-200'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:bg-teal-50'
                                                    }`}
                                            >
                                                <div className="font-bold">{timeStr}</div>
                                                <div className={`text-xs ${selectedSchedule === schedule.id ? 'text-teal-100' : 'text-slate-400'}`}>{dateStr}</div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full text-slate-500 italic">No available slots.</div>
                                )}
                            </div>
                        </div>

                        {/* Patient Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">Patient Details</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                                            placeholder="(555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || !selectedSchedule}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${submitting || !selectedSchedule
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-xl hover:from-teal-500 hover:to-blue-500'
                                }`}
                        >
                            {submitting ? 'Confirming...' : 'Confirm Appointment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
