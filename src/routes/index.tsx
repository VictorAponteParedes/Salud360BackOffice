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
import LoginPage from "../screens/auth/login";
import { AuthLayout } from "./AuthRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "patients/create", element: <Patients /> },
      { path: "patients/list", element: <PatientList /> },
      { path: "patients/:id", element: <PatientDetails /> },
      { path: "doctors/create", element: <CreateDoctor /> },
      { path: "doctors/list", element: <ListDoctors /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
]);

export const RoutesView = {
  patients: "/patients/list",
  doctors: "/doctors/list",
  createDoctor: "/doctors/create",
  hospitals: "/hospitals",
  appointments: "/appointments",
  analysis: "/analysis",
  usersRoles: "/users-roles",
  notifications: "/notifications",
  reports: "/reports",
  settings: "/settings",
  dashboard: "/",
  login: "/auth/login",
};

export default function Routes() {
  return <RouterProvider router={router} />;
}
