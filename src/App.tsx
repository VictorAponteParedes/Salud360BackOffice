// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./screens/Home";
import Patients from "./screens/Patients";
import Doctors from "./screens/Doctors";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
