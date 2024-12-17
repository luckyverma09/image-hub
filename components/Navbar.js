//components/Navbar.js
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-blue-600 text-white px-4 py-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          My Image App
        </Link>
        <div className='space-x-4 flex items-center'>
          <Link href='/upload' className='hover:underline'>
            Upload
          </Link>

          <UserButton afterSignOutUrl='/sign-in' />
        </div>
      </div>
    </nav>
  );
}
