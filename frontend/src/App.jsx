import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Area from "./pages/Area.jsx";
import Task from "./pages/Task.jsx";
import Checklist from "./pages/Checklist.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/area" element={<Area />} />
        <Route path="/task" element={<Task />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App