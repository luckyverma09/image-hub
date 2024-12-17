// pages/_app.js
import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const clerkFrontendApi = 'your-clerk-frontend-api';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
