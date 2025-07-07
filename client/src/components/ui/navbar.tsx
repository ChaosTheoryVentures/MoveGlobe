export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 sm:py-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 sm:p-4">
        <img 
          src="/logo.svg" 
          alt="MOVE Logo" 
          className="h-8 sm:h-10 w-auto"
        />
      </div>
    </nav>
  );
}