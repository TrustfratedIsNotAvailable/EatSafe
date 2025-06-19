import { Link } from "react-router";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import loginAnimation from "../assets/login-animation.json";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full bg-white shadow-[#43AF50] shadow-lg p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Lottie Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 text-center flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm">
            <img
              src="./images/logo.png"
              alt="EmpowerHer"
              className="h-16 mb-2 mx-auto"
            />
            <h2 className="text-[#1B5E20] font-bold text-2xl mb-2">EatSafe</h2>
            <h3 className="text-black font-semibold text-lg mb-1">
              Welcome back!
            </h3>
            <p className="text-gray-600 mb-6">Please Login To Your Account</p>

            {/* Google Login */}
            <div className="mb-4">
              <button
                type="button"
                className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm text-gray-700">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <hr className="flex-grow border-gray-200" />
              or
              <hr className="flex-grow border-gray-200" />
            </div>

            {/* Email/Password Login */}
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                required
              />

              <button
                type="submit"
                className="bg-[#1B5E20] text-white py-2 rounded-full hover:bg-[#388E3C] transition w-full"
              >
                Login
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-4 text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
              <a href="#" className="text-[#1B5E20] hover:underline">
                Forgot Password?
              </a>
              <span className="text-gray-500">
                Don’t have an account?
                <Link
                  to="/register"
                  className="text-[#1B5E20] hover:underline font-semibold"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
