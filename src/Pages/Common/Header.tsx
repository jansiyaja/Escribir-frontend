import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
        
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Escribir
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            <button className="text-gray-600 hover:text-blue-600">Connection</button>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <Bell size={20} />
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
              <button className="text-gray-600 hover:text-blue-600">Connection</button>
              <button className="text-gray-600 hover:text-blue-600 flex items-center">
                <Search size={20} className="mr-2" /> Search
              </button>
              <button className="text-gray-600 hover:text-blue-600 flex items-center">
                <Bell size={20} className="mr-2" /> Notifications
              </button>
              <button className="text-gray-600 hover:text-blue-600 flex items-center">
                <User size={20} className="mr-2" /> Profile
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;