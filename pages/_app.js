// pages/_app.js
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

const clerkFrontendApi = 'your-clerk-frontend-api'; 

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage = router.pathname === '/sign-in' || router.pathname === '/sign-up';
  const noLayoutRoutes = ['/sign-in', '/sign-up'];

  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
