
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-poppins font-bold text-2xl text-lgu-purple">
              LGU<span className="text-gray-800">Connect</span>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative w-full max-w-md mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search LGU Connect..."
              className="pl-10 bg-gray-50 border border-gray-200 focus:bg-white"
            />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/student-portal" className="nav-link px-3 py-2">
              Student Portal
            </Link>
            <Link to="/faculty-portal" className="nav-link px-3 py-2">
              Faculty Portal
            </Link>
            <Button size="sm" variant="default">
              Log In
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex mb-4">
              <Search className="absolute mt-3 ml-3 text-gray-400" size={18} />
              <Input
                placeholder="Search LGU Connect..."
                className="pl-10 bg-gray-50 w-full border border-gray-200"
              />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/student-portal" 
                className="px-3 py-2 hover:bg-gray-50 rounded-md nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
              <Link 
                to="/faculty-portal" 
                className="px-3 py-2 hover:bg-gray-50 rounded-md nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Faculty Portal
              </Link>
              <Button size="sm" variant="default" className="w-full">
                Log In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
