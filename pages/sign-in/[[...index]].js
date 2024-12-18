import { SignIn } from '@clerk/nextjs';
import NoLayout from '../../components/NoLayout';

const SignInPage = () => {
  return (
    <NoLayout>
      <div className='flex justify-center items-center  min-h-screen'>
        <SignIn path='/sign-in' routing='path' signUpUrl='/sign-up' />
      </div>
    </NoLayout>
  );
};

export default SignInPage;
