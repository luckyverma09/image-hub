import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deletingStatus, setDeletingStatus] = useState(null);
  const router = useRouter();

  const fetchImages = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/images?userId=${user.id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch images: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      setImages(data);
      setIsLoadingImages(false);
    } catch (err) {
      setError(err.message);
      setIsLoadingImages(false);
    }
  }, [user]);

  const deleteImage = async (publicId) => {
    try {
      const response = await fetch('/api/delete-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete image from Cloudinary');
      }
      setImages((prevImages) => prevImages.filter((img) => img.public_id !== publicId));
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Failed to delete the image. Please try again.');
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchImages();
    }
  }, [isLoaded, isSignedIn, user, fetchImages]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div className='bg-black text-white min-h-screen'>
      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold mb-6 text-[#ffa31a]'>Explore your Collection</h1>

        <section>
          {isLoadingImages ? (
            <p className='text-[#ffa31a]'>Loading images...</p>
          ) : error ? (
            <p className='text-red-500'>Error: {error}</p>
          ) : images.length === 0 ? (
            <p className='text-white'>No images uploaded yet.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto'>
              {images.map((image) => (
                <div
                  key={image.asset_id}
                  style={{ gridRowEnd: `span ${Math.ceil(image.height / 100)}` }}
                  className='relative border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg bg-gray-800 transition-all duration-300 hover:scale-105'
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.secure_url}
                    alt={image.display_name}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedImage && (
        <div
          className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
          onClick={() => setSelectedImage(null)}
        >
          <div className='relative max-w-full max-h-full' onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.secure_url}
              alt={selectedImage.display_name}
              layout='intrinsic'
              width={selectedImage.width}
              height={selectedImage.height}
              className='rounded'
            />
            <div className='absolute bottom-8 left-0 right-0 flex justify-center space-x-8'>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this image?')) {
                    setDeletingStatus('Deleting image...');
                    deleteImage(selectedImage.public_id).then(() => {
                      setDeletingStatus('Image deleted');
                      setTimeout(() => {
                        setSelectedImage(null);
                        setDeletingStatus(null);
                      }, 1000);
                    });
                  }
                }}
                className='px-6 py-3 bg-[#ffa31a] text-white rounded-lg shadow-md hover:bg-[#ffa31a] hover:scale-105 transition-all duration-300'
              >
                {deletingStatus || 'Delete'}
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className='px-6 py-3 bg-[#292929] text-white rounded-lg shadow-md border-2 border-white hover:text-[#292929] hover:bg-white hover:border-[#292929] hover:scale-105 transition-all duration-300'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
