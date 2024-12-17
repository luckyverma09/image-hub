import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect user to sign-in if not logged in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Loading state while Clerk is checking auth status
  }

  return (
    <div>
      <h1>Welcome to the Root Page</h1>
      <p>This is a protected page. You can only see this if you're logged in.</p>
    </div>
  );
}
