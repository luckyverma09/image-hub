// pages/_app.js
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-grow'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default MyApp;
