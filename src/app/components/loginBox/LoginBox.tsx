import React, { useState } from 'react';

import { ILoginData } from '@/app/interfaces/authInterface';
import { ILoginFormProps } from '@/app/interfaces/IloginFormInterface';

import { validateEmail, validatePassword } from '@/app/helpers/validator';
import { loginUser } from '@/app/helpers/api';


const LoginBox: React.FC<ILoginFormProps> = ({ onLogin }) => {

  const [userData, setUserData] = useState<ILoginData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<{ email: string[]; password: string[] }>({
    email: [],
    password: [],
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));


    if (name === 'email') {
      const emailErrors = validateEmail(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: emailErrors,
      }));
    } else if (name === 'password') {
      const passwordErrors = validatePassword(value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordErrors,
      }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const emailErrors = validateEmail(userData.email);
    const passwordErrors = validatePassword(userData.password);
  
    if (emailErrors.length === 0 && passwordErrors.length === 0) {
      try {
        await loginUser(userData.email, userData.password);
        onLogin(userData);
      } catch (error) {
        setLoginError('Invalid email or password');
        setUserData({
          email: '',
          password: '',
        });
      }
    } else {
      setLoginError(null);
      setFormErrors({
        email: emailErrors,
        password: passwordErrors,
      });
      setUserData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-md p-8 shadow-lg transition-shadow duration-600 hover:shadow-2xl flex flex-col justify-center items-center backdrop-blur-lg backdrop-opacity-50 border border-solid border-white border-opacity-5 p-4">
  <h2 className="text-tahiti mb-4 w-full">Welcome IRI Mentor. Please Log in...</h2>
  {loginError && <p className="text-red-500 mb-4 error-text">{loginError}</p>}
  <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
    <label className="block mb-4 text-tahiti w-full">
      Email:
      <input
        type="text"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        className="border p-2 rounded-md w-full"
      />
      {formErrors.email.map((error, index) => (
        <p key={index} className="text-red-500 mb-4 error-text">
          {error}
        </p>
      ))}
    </label>
    <label className="block mb-4 text-tahiti w-full">
      Password:
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        className="border p-2 rounded-md w-full"
      />
      {formErrors.password.map((error, index) => (
        <p key={index} className="text-red-500 error-text">
          {error}
        </p>
      ))}
    </label>
    <button
      type="submit"
      className={`text-tahiti p-2 rounded bg-purple-dark hover:bg-black transition-colors duration-600 mt-8 w-full ${
        formErrors.email.length > 0 || formErrors.password.length > 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={formErrors.email.length > 0 || formErrors.password.length > 0}
    >
      Login
    </button>
  </form>
</div>

  );
};

export default LoginBox;
