import type { PatientStatusEnum } from "../enums";

export type PatientFormData = {
    id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    email: string;
    documentNumber: string;
    password: string;
    confirmPassword?: string;
    dateBirth: string;
    bloodType: string;
    allergies: string;
    contactEmergency: string;
    profileImage?: any;
    status?: PatientStatusEnum;
    lastVisit?: string;
    doctor?: string;
    photo?: {
        file: File;
        preview: string;
    };
    profileImageId?: string;
}

export type LoginFormData = {
    email: string;
    password: string;
};

export type ForgotPasswordData = {
    email: string
}
export type ResetPassword = {
    code: string;
    newPassword: string;
}
