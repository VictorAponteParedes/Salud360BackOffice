export interface InformationCardImage {
    id: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path?: string;
}


export interface InformationCardFormData {
    title: string;
    description: string;
    screen?: string;
    serviceImage?: InformationCardImage;
}
