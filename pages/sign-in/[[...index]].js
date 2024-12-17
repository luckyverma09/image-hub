import { SignIn } from '@clerk/nextjs';
import NoLayout from '../../components/NoLayout';

const SignInPage = () => {
  return (
    <NoLayout>
      <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
    </NoLayout>
  );
};

export default SignInPage;
