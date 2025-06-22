import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/form/TextInput";
import { ImageInput } from "../../components/form/ImageInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useHospital } from "../../hooks/useHospital";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang";
import { Building, Globe, MapPin, Phone, ArrowLeft, PlusCircle } from "lucide-react";
import type { HospitalType } from "../../types/hospital";
import HospitalLocationMap from "./HospitalLocationMap";
import { Panel } from "primereact/panel";

export default function Hospitals() {
    const methods = useForm<HospitalType>();
    const navigate = useNavigate();
    const { createHospital } = useHospital();
    const [message, setMessage] = useState<null | {
        type: "success" | "error";
        title: string;
        description: string;
    }>(null);

    const onSubmit = async (data: HospitalType) => {
        try {
            const formData = new FormData();
            if (data.hospitaImage?.path) {
                formData.append("file", data.hospitaImage?.path);
            }

            let imageId = null;
            const hospitalData = {
                ...data,
                hospitalImageId: imageId,
            };

            await createHospital(hospitalData);
            setMessage({
                type: "success",
                title: translate("registerHospital.message.success.title"),
                description: translate("registerHospital.message.success.description"),
            });

            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                title: translate("registerHospital.message.error.title"),
                description: error.message || translate("registerHospital.message.error.description"),
            });
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <motion.form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {translate("registerHospital.title")}
                            </h1>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover flex items-center gap-2"
                        >
                            <PlusCircle size={18} />
                            <span>{translate("registerHospital.button.submit")}</span>
                        </button>
                    </div>

                    {/* Panel: Información general del hospital */}
                    <Panel
                        header={
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Building className="text-blue-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {translate("registerHospital.fields.titleGeneralInfo")}
                                </span>
                            </div>
                        }
                        toggleable
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <ImageInput
                                    name="hospitalImage"
                                    label={translate("registerHospital.fields.image.label")}
                                    control={methods.control}
                                />
                            </div>
                            <TextInput
                                name="name"
                                label={translate("registerHospital.fields.name.label")}
                                placeholder={translate("registerHospital.fields.name.placeholder")}
                            />
                            <TextInput
                                name="address"
                                label={translate("registerHospital.fields.address.label")}
                                placeholder={translate("registerHospital.fields.address.placeholder")}
                            />
                            <TextInput
                                name="city"
                                label={translate("registerHospital.fields.city.label")}
                                placeholder={translate("registerHospital.fields.city.placeholder")}
                            />
                            <TextInput
                                name="state"
                                label={translate("registerHospital.fields.state.label")}
                                placeholder={translate("registerHospital.fields.state.placeholder")}
                            />
                            <TextInput
                                name="country"
                                label={translate("registerHospital.fields.country.label")}
                                placeholder={translate("registerHospital.fields.country.placeholder")}
                            />
                        </div>
                    </Panel>

                    {/* Panel: Ubicación geográfica */}
                    <Panel
                        header={
                            <div className="flex items-center gap-2">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <MapPin className="text-purple-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {translate("registerHospital.fields.titleMap")}
                                </span>
                            </div>
                        }
                        toggleable
                    >
                        <div className="space-y-4">
                            <HospitalLocationMap
                                onChange={(lat, lng) => {
                                    methods.setValue("latitude", lat);
                                    methods.setValue("longitude", lng);
                                }}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextInput
                                    name="latitude"
                                    label={translate("registerHospital.fields.latitude.label")}
                                    placeholder="-25.263739"
                                    type="number"
                                />
                                <TextInput
                                    name="longitude"
                                    label={translate("registerHospital.fields.longitude.label")}
                                    placeholder="-57.575926"
                                    type="number"
                                />
                            </div>
                        </div>
                    </Panel>

                    {/* Panel: Información de contacto */}
                    <Panel
                        header={
                            <div className="flex items-center gap-2">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <Phone className="text-green-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {translate("registerHospital.fields.titleContactLocation")}
                                </span>
                            </div>
                        }
                        toggleable
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                name="phone"
                                label={translate("registerHospital.fields.phone.label")}
                                placeholder={translate("registerHospital.fields.phone.placeholder")}
                            />
                            <TextInput
                                name="email"
                                label={translate("registerHospital.fields.email.label")}
                                placeholder={translate("registerHospital.fields.email.placeholder")}
                                type="email"
                            />
                            <TextInput
                                name="website"
                                label={translate("registerHospital.fields.website.label")}
                                placeholder={translate("registerHospital.fields.website.placeholder")}
                            />
                        </div>
                    </Panel>
                </motion.form>
            </FormProvider>

            {message && (
                <MessageToast {...message} onClose={() => setMessage(null)} />
            )}
        </>
    );
}