import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-[#262626] text-white text-center py-4 mt-auto w-full'>
      <p>
        &copy; {new Date().getFullYear()} Made with ❣️ by
        <a
          href='https://github.com/luckyverma09'
          target='_blank'
          rel='noopener noreferrer'
          className='text-orange-400 hover:text-orange-300 transition-colors duration-300'
        >
          {' Lucky'}
        </a>
      </p>
    </footer>
  );
}
