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
import MedicalAnalysis from "../screens/medicalAnalysis/AnalusisCreate";
import LoginPage from "../screens/auth/login";
import { AuthLayout } from "./AuthRoutes";

export const RoutesView = {
  patients: "/patients/list",
  patientDetail: "patients/:id",
  createPatient: "/patients/create",
  doctors: "/doctors/list",
  createDoctor: "/doctors/create",
  hospitals: "/hospitals",
  appointments: "/appointments",
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
