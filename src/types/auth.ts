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
    profileImage?: {
        url: string;
        id?: string;
        filename?: string;
        originalname?: string;
        mimetype?: string;
        size?: number;
        path?: string;
    };
    status?: PatientStatusEnum;
    lastVisit?: string;
    doctor?: string;
    profileImageId?: string;
    onclick?: () => void;
};

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
