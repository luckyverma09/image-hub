// components/Footer.js
export default function Footer() {
  return (
    <footer className='bg-[#262626] text-white text-center py-4 mt-auto'>
      <p>
        &copy; {new Date().getFullYear()} Made with ❣️ by
        <span className='text-orange-400'> Lucky</span>
      </p>
    </footer>
  );
}
