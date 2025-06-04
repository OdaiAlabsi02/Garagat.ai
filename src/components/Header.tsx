
import React from 'react';
import { Car, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8" style={{ color: '#FF6B35' }} />
            <span className="text-2xl font-bold text-gray-900">Garagat</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 font-medium hover:text-[#FF6B35] transition-colors">Services</a>
              <a href="#" className="text-gray-700 font-medium hover:text-[#FF6B35] transition-colors">Garages</a>
              <a href="#" className="text-gray-700 font-medium hover:text-[#FF6B35] transition-colors">My Bookings</a>
            </nav>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
