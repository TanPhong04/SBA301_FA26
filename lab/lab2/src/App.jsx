// src/App.jsx
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Orchid from "./components/Orchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail"; // <--- Import file mới
import { OrchidsData } from "./data/ListOfOrchidss";
import TestCount from "./components/TestCount";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Orchid orchidList={OrchidsData} />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="detail/:id" element={<OrchidDetail />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
