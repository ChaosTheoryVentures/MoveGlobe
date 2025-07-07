import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Consult from "./pages/consult";
import Contact from "./pages/contact";
import Privacy from "./pages/privacy";
import Voorwaarden from "./pages/voorwaarden";
import Cases from "./pages/cases";
import Sectoren from "./pages/sectoren";
import Oplossingen from "./pages/oplossingen";
import NotFound from "./pages/not-found";
import "@fontsource/inter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/voorwaarden" element={<Voorwaarden />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/sectoren" element={<Sectoren />} />
        <Route path="/oplossingen" element={<Oplossingen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
