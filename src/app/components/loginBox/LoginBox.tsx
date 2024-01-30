import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginData } from "@/app/interfaces/authInterface";

interface LoginFormProps {
  onLogin: (data: LoginData) => void;
}

const LoginBox: React.FC<LoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    // Aquí puedes realizar la validación y autenticación contra AirTable 1
    // Simplemente llamaremos a la función proporcionada por `onLogin` para este ejemplo.
    onLogin(data);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-md p-8 shadow-lg transition-shadow duration-600 hover:shadow-2xl flex flex-col justify-center items-center backdrop-blur-lg backdrop-opacity-50">
      <h2 className="text-tahiti mb-4 w-full">Welcome IRI Mentor. Please Log in...</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
        <label className="text-black block mb-4 text-tahiti w-full">
          Email: 
          <input type="text" {...register("email")} className="border p-2 rounded-md w-full" />
        </label>
        <label className="text-black block mb-4 text-tahiti w-full">
          Password: 
          <input type="password" {...register("password")} className="border p-2 rounded-md w-full" />
        </label>
        <button type="submit" className="text-tahiti p-2 rounded bg-purple-dark hover:bg-black transition-colors duration-600 mt-8 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginBox;
