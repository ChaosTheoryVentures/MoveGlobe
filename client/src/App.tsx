import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Scene } from "./components/Scene";
import "@fontsource/inter";

function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white text-xl font-bold">Globe Explorer</div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition">About</a>
            <a href="#" className="text-white hover:text-gray-300 transition">Features</a>
            <a href="#" className="text-white hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #0a0a0a, #1a1a2e)' }}>
        <Canvas
          shadows
          camera={{
            position: [0, 0, 5],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "default"
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="text-center pointer-events-auto">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Explore the World
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
              Experience our planet like never before. Drag to rotate and explore every corner of Earth in stunning 3D.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-lg">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="h-screen bg-gray-900"></div>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md text-white py-6 transition-transform duration-300 z-40 ${
        showFooter ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 Globe Explorer. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
