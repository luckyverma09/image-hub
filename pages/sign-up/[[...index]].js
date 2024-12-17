import { SignUp } from '@clerk/nextjs';
import NoLayout from '../../components/NoLayout';

const SignUpPage = () => {
  return (
    <NoLayout>
      <SignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
    </NoLayout>
  );
};

export default SignUpPage;
