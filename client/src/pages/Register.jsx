import { Link } from "react-router";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import registerAnimation from "../assets/register-animation.json";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full bg-white shadow-[#43AF50] shadow-lg p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Lottie Animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96">
            <Lottie animationData={registerAnimation} loop={true} />
          </div>
        </div>

        {/* Right: Register Form */}
        <div className="w-full md:w-1/2 text-center flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm">
            <img
              src="./images/logo.png"
              alt="EmpowerHer"
              className="h-16 mb-2 mx-auto"
            />
            <h2 className="text-[#1B5E20] font-bold text-2xl mb-2">EatSafe</h2>
            <h3 className="text-black font-semibold text-lg mb-1">
              Create your account
            </h3>
            <p className="text-gray-600 mb-6">
              Please create your account to get started
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                required
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
                required
              />

              <button
                type="submit"
                className="bg-[#1B5E20] text-white py-2 rounded-full hover:bg-[#388E3C] transition w-3/4 mx-auto"
              >
                Register
              </button>
            </form>

            <div className="mt-4 text-sm">
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link
                to="/login"
                className="text-[#1B5E20] font-semibold hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
