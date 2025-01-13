import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Body from '../components/Body';
import { FiMenu } from 'react-icons/fi';
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 768);
  const [isMenuOpenVisible, setIsMenuOpenVisible] = useState(window.innerWidth >= 768);

  const toggleSidebarExpansion = () => setIsSidebarExpanded(prev => !prev);
  const toggleSidebarVisibility = () => setIsSidebarVisible(prev => !prev);
  const toggleMenuVisibility = () => setIsMenuOpenVisible(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setIsSidebarVisible(!mobileView);
      setIsMenuOpenVisible(!mobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`h-full transition-all duration-300 transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} ${isMobile ? 'absolute top-0 left-0 z-40 h-full' : 'h-auto'}`}
      >
        {(isSidebarVisible || !isMobile) && (
          <Sidebar
            isExpanded={isSidebarExpanded}
            toggleExpansion={toggleSidebarExpansion}
            toggleVisibility={toggleSidebarVisibility}
            isMobile={isMobile}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-auto">
        <Header isMobile={isMobile} isMenuOpen={isMenuOpenVisible}/>
        
        {isMobile && (
          <div
            className="absolute top-4 left-4 p-2 bg-white text-black rounded-full cursor-pointer z-50"
            onClick={toggleSidebarVisibility}
          >
            <FiMenu size={20} />
          </div>
        )}
        
        {isMobile && (
          <div
            className="absolute top-4 right-4 p-2 bg-white text-black rounded-full cursor-pointer z-50"
            onClick={toggleMenuVisibility}
          >
            <FaUser size={20} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
