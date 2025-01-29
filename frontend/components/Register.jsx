import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <div className='flex-grow flex items-center justify-center'>
        <div className='max-w-md mx-auto p-8 border rounded-lg shadow-lg bg-[#262626]'>
          <h2 className='text-2xl font-bold text-center mb-4 text-white'>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              className='mb-4 p-2 border rounded-md w-full bg-[#333] text-white'
              required
            />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='mb-4 p-2 border rounded-md w-full bg-[#333] text-white'
              required
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='mb-4 p-2 border rounded-md w-full bg-[#333] text-white'
              required
            />
            <button
              type='submit'
              className={`w-full p-3 ${
                isLoading ? 'bg-gray-500' : 'bg-[#ffa31a]'
              } text-white rounded-md hover:bg-[#ffb84d]`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className='text-center text-white mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-[#ffa31a] hover:text-[#ffb84d]'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
