import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/home";
import AIAnalyse from "./pages/ai-analyse";
import Contact from "./pages/contact";
import Privacy from "./pages/privacy";
import Voorwaarden from "./pages/voorwaarden";
import Cases from "./pages/cases";
import Oplossingen from "./pages/oplossingen";
import FormSubmissions from "./pages/admin/form-submissions";
import AdminLogin from "./pages/admin/login";
import NotFound from "./pages/not-found";
import "@fontsource/inter";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/form-submissions"
                  element={
                    <ProtectedRoute>
                      <FormSubmissions />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;