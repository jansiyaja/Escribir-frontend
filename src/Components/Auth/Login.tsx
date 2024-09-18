
import Spinner from "../Spinner";
import UseLogin from "../Hooks/UseLogin";
import PasswordToogle from "../PasswordToggle";




 const Login: React.FC = () => {
 const {login,loading,error,handleChange,handleLogin}=UseLogin()


  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
      </div>

     

      <PasswordToogle
        id="password"
        name="password"
        value={login.password}
        placeholder="Enter your password"
        onChange={handleChange}
        error={error.password}
        label="Password"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        disabled={loading}
      >
       
        <Spinner size="h-5 w-5" color="text-white" text="Verifying..." isLoading={loading} />
       
        {!loading && "Login"}
      </button>
      {error.generic && <p className="text-red-500 text-sm mt-1 text-center">{error.generic}</p>}
    </form>
  );
};

export default Login;
