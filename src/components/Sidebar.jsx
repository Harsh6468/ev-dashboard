import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';

const Sidebar = ({ isExpanded, toggleExpansion, isMobile }) => {
  return (
    <div
      className={`${
        isExpanded ? 'w-64' : 'w-16'
      } bg-blue-600 text-white h-full transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 justify-end flex items-center">
        {!isMobile && (
          <button
            onClick={toggleExpansion}
            className="p-2 bg-blue-500 rounded-full hover:bg-blue-700"
          >
            {isExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-start space-y-4 p-4">
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-500 p-2 rounded-md">
          <FaChartBar size={20} />
          {isExpanded && <span>DashBoard</span>}
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-500 p-2 rounded-md">
          <FaCog size={20} />
          {isExpanded && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
