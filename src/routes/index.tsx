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
import MedicalAnalysis from "../screens/medicalAnalysis/AnalysisCreate";
import AnalysisList from "../screens/medicalAnalysis/ListAnalysis";
import LoginPage from "../screens/auth/login";
import { AuthLayout } from "./AuthRoutes";
import AppointmentList from "../screens/appointment/AppointmentList";
import AppointmentForm from "../screens/appointment/AppointmentCreate";

export const RoutesView = {
  //patient
  patients: "/patients/list",
  patientDetail: "patients/:id",
  createPatient: "/patients/create",

  //doctor
  doctors: "/doctors/list",
  analysisList: "/analysis/list",
  createDoctor: "/doctors/create",

  //appoitment
  appointmentList: "/appointment/list",
  appointmentCreate: "/appointment/create",
  //hospital
  hospitals: "/hospitals",
  analysis: "/analysis/create",
  usersRoles: "/users-roles",
  notifications: "/notifications",
  reports: "/reports",
  settings: "/settings",
  dashboard: "/",
  login: "/auth/login",
  languages: "/languages",
  specialties: "/specialties",
};

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
      { path: `${RoutesView.analysis}`, element: <MedicalAnalysis /> },
      { path: `${RoutesView.analysisList}`, element: <AnalysisList /> },
      { path: `${RoutesView.appointmentList}`, element: <AppointmentList /> },
      { path: `${RoutesView.appointmentCreate}`, element: <AppointmentForm /> },
    ],
  },
  {
    path: `${RoutesView.login}`,
    element: <AuthLayout />,
    children: [{ path: `${RoutesView.login}`, element: <LoginPage /> }],
  },
]);



export default function Routes() {
  return <RouterProvider router={router} />;
}
