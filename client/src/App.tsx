import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/home";
import AIAnalyse from "./pages/ai-analyse";
import Contact from "./pages/contact";
import Privacy from "./pages/privacy";
import Voorwaarden from "./pages/voorwaarden";
import Cases from "./pages/cases";
import AIAgents from "./pages/ai-agents";
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
          <Route path="/ai-agents" element={<AIAgents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;