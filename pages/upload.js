import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function UploadPage() {
  const { user } = useUser();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async () => {
      const fileType = file.type;
      const base64File = reader.result.split(',')[1];

      try {
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
      } catch (error) {
        console.error('Upload error:', error);
        alert('An error occurred during upload.');
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className='bg-black text-white min-h-screen'>
      <main className='  container mx-auto px-4  py-60'>
        <div className='relative z-10 bg-white bg-opacity-30 backdrop-blur-md border border-gray-200 rounded-lg p-8 shadow-lg max-w-md mx-auto'>
          <h1 className='text-3xl font-bold mb-6 text-[#ffa31a]'>Upload Image</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col'>
              <input
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
                className='px-4 py-2 bg-gray-700 text-white border-2 border-[#ffa31a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffa31a]'
                disabled={isUploading}
              />
            </div>
            <div className='flex justify-center space-x-8'>
              <button
                type='submit'
                className='px-6 py-3 bg-[#ffa31a] text-white rounded-lg shadow-md hover:bg-[#ffa31a] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isUploading || !file}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
              <button
                type='button'
                onClick={() => router.push('/')}
                className='px-6 py-3 bg-[#292929] text-white rounded-lg shadow-md border-2 border-white hover:text-[#ffa31a] hover:border-[#ffa31a] hover:scale-105 transition-all duration-300'
                disabled={isUploading}
              >
                Go to Homepage
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
