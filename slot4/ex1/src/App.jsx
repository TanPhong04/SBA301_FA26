import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";
import About from "./components/About";
import Contact from "./components/Contact";
import { OrchidsData } from "./data/ListOfOrchidss";
import TestCount from "./components/TestCount";

function App() {
  return (
    <Router>
      <Header />
      <br />
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Orchid orchidList={OrchidsData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <br />
        <TestCount />
        <br />
        <Footer
          avatar="https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg"
          name="phongtt"
          email="sw.phongtt@gmail.com"
        />
      </main>
    </Router>
  );
}
export default App;
