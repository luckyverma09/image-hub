import { SignUp } from '@clerk/nextjs';
import NoLayout from '../../components/NoLayout';

const SignUpPage = () => {
  return (
    <NoLayout>
      <div className='flex justify-center items-center  min-h-screen'>
        <SignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
      </div>
    </NoLayout>
  );
};

export default SignUpPage;
