import React from 'react';

const Header = ({ isMobile, isMenuOpen }) => {
  return (
    <header className={`bg-white shadow-md p-4 flex items-center ${isMobile ? 'justify-center' : 'justify-between'} relative`}>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Mobile View: Buttons that slide in from the right */}
      {isMobile && (
        <div
          className={`absolute top-[67px] right-0 bg-white shadow-md flex flex-col items-center space-y-4 z-40 transition-width duration-300 ease-in-out ${
            !isMenuOpen ? 'w-0 px-0 py-0' : 'px-4 py-4 w-full'
          }`}
        >
          <button className={`bg-blue-500 text-white rounded hover:bg-blue-600 transition-width duration-300 ease-in-out ${
            !isMenuOpen ? 'w-0 px-0 py-0' : 'px-4 py-2 w-full'
          }`}>
            Login
          </button>
          <button className={`bg-green-500 text-white rounded hover:bg-green-600 transition-width duration-300 ease-in-out ${
            !isMenuOpen ? 'w-0 px-0 py-0' : 'px-4 py-2 w-full'
          }`}>
            Signup
          </button>
        </div>
      )}

      {/* Desktop View: Buttons */}
      <div className={`flex space-x-4 ${isMobile ? 'hidden' : ''}`}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Signup
        </button>
      </div>
    </header>
  );
};

export default Header;
