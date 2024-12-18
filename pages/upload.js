// pages/upload.js
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const { user } = useUser();
  const router = useRouter();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async () => {
      const fileType = file.type;
      const base64File = reader.result.split(',')[1];

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: `data:${fileType};base64,${base64File}`,
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed!');
      }
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className='flex items-center justify-center  h-87 bg-gray-300'>
      <div className='bg-white bg-opacity-30 backdrop-blur-md border border-gray-200 rounded-lg p-8 shadow-lg'>
        <h1 className='text-3xl font-bold mb-6 text-orange-500'>Upload Image</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex flex-col'>
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='px-4 py-2 bg-gray-700 text-white border-2 border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>
          <div className='flex space-x-4'>
            <button
              type='submit'
              className='px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 transition-all duration-300'
            >
              Upload
            </button>
            <button
              type='button'
              onClick={() => router.push('/')}
              className='px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-orange-400 transition-all duration-300'
            >
              Go to Homepage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
