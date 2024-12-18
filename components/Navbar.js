// components/Navbar.js
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='bg-black shadow-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/logo.jpg' alt='My Image App Logo' width={150} height={40} />
        </Link>

        <div className='flex items-center space-x-8'>
          <Link
            href='/upload'
            className='relative inline-block text-lg font-medium text-white group'
          >
            <span className='relative px-6 py-2 border border-white rounded-lg group-hover:border-[#ffa31a] group-hover:text-[#ffa31a] transition duration-300 ease-in-out'>
              Upload
            </span>
          </Link>
          <UserButton
            afterSignOutUrl='/sign-in'
            appearance={{
              elements: {
                avatarImage: 'rounded-full',
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
}
