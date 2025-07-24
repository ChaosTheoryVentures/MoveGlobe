import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/home";
import AIAnalyse from "./pages/ai-analyse";
import Contact from "./pages/contact";
import Privacy from "./pages/privacy";
import Voorwaarden from "./pages/voorwaarden";
import Cases from "./pages/cases";
import Oplossingen from "./pages/oplossingen";
import FormSubmissions from "./pages/admin/form-submissions";
import NotFound from "./pages/not-found";
import "@fontsource/inter";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-analyse" element={<AIAnalyse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/voorwaarden" element={<Voorwaarden />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/oplossingen" element={<Oplossingen />} />
          <Route path="/admin/form-submissions" element={<FormSubmissions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;