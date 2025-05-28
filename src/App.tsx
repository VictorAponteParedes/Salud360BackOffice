// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./screens/Home";
import Patients from "./screens/patients/Patients";
import ListPatients from "./screens/patients/ListPatients";
import Doctors from "./screens/Doctors";
import "./index.css";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients/create" element={<Patients />} />
          <Route path="/patients" element={<ListPatients />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
