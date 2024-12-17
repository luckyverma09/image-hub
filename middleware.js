import { clerkMiddleware } from '@clerk/nextjs/server';

// Apply authentication middleware
export default clerkMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)"],
});

export const config = {
  matcher: ['/', '/((?!.*\\..*|_next).*)'], 
};
