//pages/index.js
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
  }, [isLoaded, isSignedIn, user]);

  const fetchImages = async () => {
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
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view this page.</div>;
  }

  return (
    <div>
      <Navbar />
      <main className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Welcome to the Root Page</h1>
        <p className='mb-8'>This is a protected page. You can only see this if you're logged in.</p>

        <section>
          <h2 className='text-2xl font-semibold mb-4'>Uploaded Images</h2>
          {isLoadingImages ? (
            <p>Loading images...</p>
          ) : error ? (
            <p className='text-red-500'>Error: {error}</p>
          ) : images.length === 0 ? (
            <p>No images uploaded yet.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {images.map((image) => (
                <div key={image.asset_id} className='border rounded-lg overflow-hidden shadow-md'>
                  <img
                    src={image.secure_url}
                    alt={image.public_id}
                    className='w-full h-auto object-cover'
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
