export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 sm:py-6">
      <a href="/">
        <img 
          src="/logo.svg" 
          alt="MOVE Logo" 
          className="h-10 sm:h-12 w-auto"
        />
      </a>
    </nav>
  );
}