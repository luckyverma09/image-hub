import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isUploadPage = location.pathname === '/upload';

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the JWT from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className='bg-[#262626] shadow-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src='../public/logo.png' alt='My Image App Logo' width={150} height={40} />
        </Link>

        <div className='flex items-center space-x-4 sm:space-x-8'>
          <Link
            to={isUploadPage ? '/' : '/upload'}
            className='relative inline-block text-sm sm:text-lg font-medium text-white group'
          >
            <span className='relative px-4 py-2 sm:px-6 sm:py-2 border border-white rounded-lg group-hover:border-[#ffa31a] group-hover:text-[#ffa31a] transition duration-300 ease-in-out'>
              {isUploadPage ? 'Gallery' : 'Upload'}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className='relative inline-block text-sm sm:text-lg font-medium text-white group'
          >
            <span className='relative px-4 py-2 sm:px-6 sm:py-2 border border-white rounded-lg group-hover:border-[#ffa31a] group-hover:text-[#ffa31a] transition duration-300 ease-in-out'>
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
