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
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-bold mb-4'>Upload Image</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <div className='flex space-x-4'>
          <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
            Upload
          </button>
          <button
            type='button'
            onClick={() => router.push('/')}
            className='px-4 py-2 bg-gray-500 text-white rounded'
          >
            Go to Homepage
          </button>
        </div>
      </form>
    </div>
  );
}
