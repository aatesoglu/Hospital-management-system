import api from './client';
import { type Department, type Doctor, type Schedule, type Appointment, type Patient } from '../types';

export const getDepartments = async () => {
    const response = await api.get<Department[]>('/departments');
    return response.data;
};

export const getDoctors = async (departmentId?: number) => {
    const params = departmentId ? { department_id: departmentId } : {};
    const response = await api.get<Doctor[]>('/doctors', { params });
    return response.data;
};

export const getDoctor = async (id: number) => {
    const response = await api.get<Doctor>(`/doctors/${id}`);
    return response.data;
};

export const getSchedules = async (doctorId?: number) => {
    const params = doctorId ? { doctor_id: doctorId } : {};
    const response = await api.get<Schedule[]>('/schedules', { params });
    return response.data;
};

export const createAppointment = async (appointment: Partial<Appointment>, patient: Patient) => {
    const response = await api.post<Appointment>('/appointments', {
        appointment,
        patient,
    });
    return response.data;
};
