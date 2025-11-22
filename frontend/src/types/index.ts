export interface Department {
    id: number;
    name: string;
    description: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialization: string;
    department_id: number;
    department?: Department;
}

export interface Schedule {
    id: number;
    doctor_id: number;
    start_time: string;
    end_time: string;
    available: boolean;
}

export interface Patient {
    id?: number;
    name: string;
    email: string;
    phone: string;
}

export interface Appointment {
    id?: number;
    doctor_id: number;
    patient_id?: number;
    schedule_id: number;
    status: string;
    patient?: Patient;
}
