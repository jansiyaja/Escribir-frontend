import React from "react";
import useRegister from "./Hooks/UseRegister";
import Spinner from "../Spinner";

import PasswordToogle from "../PasswordToggle";


const Register: React.FC = () => {
  const { register, errors, loading, handleChange, handleRegister } = useRegister();

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="username"
          value={register.username}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={register.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

     
          
          <PasswordToogle
        id="password"
        name="password"
        value={register.password}
        placeholder="Enter your password"
        onChange={handleChange}
        error={errors.password}
        label="Password"
      />
      

      <PasswordToogle
      
          id="confirm-password"
          name="confirmPassword"
          value={register.confirmPassword}
          onChange={handleChange}
          
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          label="Password"
          /> 

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <Spinner size="h-5 w-5" color="text-white" text="Creating Account..." isLoading={loading} />
        ) : (
          "Create Account"
        )}
      </button>

      {errors.generic && <p className="text-red-500 text-sm mt-1 text-center">{errors.generic}</p>}

      <div className="mt-6 text-center">
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default Register;
