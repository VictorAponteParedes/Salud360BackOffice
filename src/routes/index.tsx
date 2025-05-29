import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Home from '../screens/Home';
import Patients from '../screens/patients/Patients';
import PatientList from '../screens/patients/ListPatients';
import CreateDoctor from "../screens/doctors/CreateDoctor";
import ErrorPage from '../components/erroPage';
import ListDoctors from "../screens/doctors/ListDoctors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "patients/create", element: <Patients /> },
      { path: "patients/list", element: <PatientList /> },
      { path: "doctors/create", element: <CreateDoctor /> },
      { path: "doctors/list", element: <ListDoctors /> },
    ],
  },
]);

export default function Routes() {
    return <RouterProvider router={router} />;
}
