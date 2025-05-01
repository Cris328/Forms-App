import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateTemplate from "./pages/CreateTemplate.jsx";
import TemplateResponsePage from "./pages/TemplateResponse.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-template" element={<CreateTemplate />} />
        <Route path="/template-response/:id" element={<TemplateResponsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
