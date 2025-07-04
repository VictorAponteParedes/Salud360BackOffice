// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Home from "../screens/Home";
import Patients from "../screens/patients/Patients";
import PatientList from "../screens/patients/ListPatients";
import CreateDoctor from "../screens/doctors/CreateDoctor";
import ErrorPage from "../components/erroPage";
import ListDoctors from "../screens/doctors/ListDoctors";
import PatientDetails from "../screens/patients/PatientDetails";
import AnalysisCreate from "../screens/medicalAnalysis/AnalysisCreate";
import ForgotPassword from "../screens/auth/forgotPassword";
// import AnalysisCreate from "../screens/analysis/AnalysisCreate";
import AnalysisList from "../screens/medicalAnalysis/ListAnalysis";
import LoginPage from "../screens/auth/login";
import { AuthLayout } from "./AuthRoutes";
import AppointmentList from "../screens/appointment/AppointmentList";
import AppointmentForm from "../screens/appointment/AppointmentCreate";
import { RoutesView } from "./route";
import VerifyCode from "../screens/auth/VerifyCode";
import Hospitals from "../screens/hospitals/CreateHospital";
import HospitalList from "../screens/hospitals/HospitalLista";
import HospitalDetails from "../screens/hospitals/HospitalDetails";
import InformationCardCreate from "../screens/information-card/InformationCardCreate";
import InformationCardList from "../screens/information-card/InformationCardList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: `${RoutesView.createPatient}`, element: <Patients /> },
      { path: `${RoutesView.patients}`, element: <PatientList /> },
      { path: `${RoutesView.patientDetail}`, element: <PatientDetails /> },
      { path: `${RoutesView.createDoctor}`, element: <CreateDoctor /> },
      { path: `${RoutesView.doctors}`, element: <ListDoctors /> },
      { path: `${RoutesView.analysis}`, element: <AnalysisCreate /> },
      { path: `${RoutesView.analysisList}`, element: <AnalysisList /> },
      { path: `${RoutesView.appointmentList}`, element: <AppointmentList /> },
      { path: `${RoutesView.appointmentCreate}`, element: <AppointmentForm /> },
      { path: `${RoutesView.hospitals}`, element: <Hospitals /> },
      { path: `${RoutesView.listHospital}`, element: <HospitalList /> },
      { path: `${RoutesView.hospitalDetail}`, element: <HospitalDetails /> },
      { path: `${RoutesView.informationCardCreate}`, element: <InformationCardCreate /> },
      { path: `${RoutesView.informationCardList}`, element: <InformationCardList /> },
    ],
  },
  {
    path: `${RoutesView.login}`,
    element: <AuthLayout />,
    children: [{ path: `${RoutesView.login}`, element: <LoginPage /> }],
  },
  {
    path: `${RoutesView.forgotPassword}`,
    element: <ForgotPassword />,
  },
  {
    path: RoutesView.verifyCode,
    element: <VerifyCode />,
  },
]);



export default function Routes() {
  return <RouterProvider router={router} />;
}
