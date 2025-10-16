import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Area from "./pages/Area.jsx";
import Task from "./pages/Task.jsx";
import Checklist from "./pages/Checklist.jsx";
import Report from "./pages/Report.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/area" element={<Area />} />
        <Route path="/task" element={<Task />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App