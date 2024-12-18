import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchImages = useCallback(async () => {
    if (!user) return;
    try {
      console.log('Fetching images for user:', user.id);
      const response = await fetch(`/api/images?userId=${user.id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch images: ${response.status} ${response.statusText}. ${errorText}`
        );
      }
      const data = await response.json();
      console.log('Fetched images:', data);
      setImages(data);
      setIsLoadingImages(false);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.message);
      setIsLoadingImages(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log('User authenticated, fetching images');
      fetchImages();
    } else {
      console.log('Authentication status:', { isLoaded, isSignedIn, user });
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {images.map((image) => (
                <div
                  key={image.asset_id}
                  className='border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg bg-gray-800'
                >
                  <Image
                    src={image.secure_url}
                    alt={image.display_name}
                    width={300}
                    height={200}
                    layout='responsive'
                    objectFit='cover'
                    className='transition-all duration-300 hover:scale-105'
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
