import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/home";
import Consult from "./pages/consult";
import Contact from "./pages/contact";
import Privacy from "./pages/privacy";
import Voorwaarden from "./pages/voorwaarden";
import Cases from "./pages/cases";
import Oplossingen from "./pages/oplossingen";
import Kennisbank from "./pages/kennisbank";
import ROI from "./pages/roi";
import NotFound from "./pages/not-found";
import "@fontsource/inter";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/voorwaarden" element={<Voorwaarden />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/oplossingen" element={<Oplossingen />} />
          <Route path="/kennisbank" element={<Kennisbank />} />
          <Route path="/roi" element={<ROI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
