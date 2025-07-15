import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import loginAnimation from "../assets/login-animation.json";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { login, googleSignIn } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const isDark = theme === "dark";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    login(email, password)
      .then(() => {
        toast.success("Login success");
        navigate(from, { replace: true });
        form.reset();
      })
      .catch(() => toast.error("Login Failed"));
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };

        axios
          .get(`/users/${user.uid}`)
          .then(() => {
            toast.success("Logged in successfully!");
            navigate("/");
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              axios
                .post("/users", savedUser)
                .then(() => {
                  toast.success("User created & logged in!");
                  navigate("/");
                })
                .catch(() => toast.error("Failed to save user"));
            } else {
              toast.error("Something went wrong");
            }
          });
      })
      .catch(() => {
        toast.error("Google login failed");
      });
  };

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen flex items-center justify-center px-4`}
    >
      <div
        className={`${
          isDark ? "bg-gray-800 shadow-gray-600" : "bg-white shadow-[#43AF50]"
        } max-w-6xl w-full shadow-lg p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8`}
      >
        {/* Left: Lottie Animation */}
        {/* <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div> */}

        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 text-center flex flex-col items-center">
          <div className="w-full max-w-xs sm:max-w-sm">
            <img
              src="./images/logo.png"
              alt="EatSafe"
              className={`h-16 mb-2 mx-auto ${
                isDark ? "bg-white rounded-lg" : ""
              }`}
            />
            <h2
              className={`font-bold text-2xl mb-2  ${
                isDark ? "text-white" : "text-[#1B5E20]"
              }`}
            >
              EatSafe
            </h2>
            <h3 className="font-semibold text-lg mb-1">Welcome back!</h3>
            <p className="text-gray-500 mb-6">Please Login To Your Account</p>

            {/* Google Login */}
            <div className="mb-4">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className={`${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                } flex items-center justify-center gap-3 w-full py-2 rounded-md transition`}
              >
                <FcGoogle className="text-xl" />
                <span className="text-sm">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <hr className="flex-grow border-gray-200" />
              or
              <hr className="flex-grow border-gray-200" />
            </div>

            {/* Email/Password Login */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                } border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]`}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                } border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]`}
                required
              />
              <input
                type="submit"
                value="Login"
                className="bg-[#1B5E20] text-white py-2 rounded-full hover:bg-[#388E3C] transition w-full"
              />
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
                  className="text-[#1B5E20] hover:underline font-semibold ml-1"
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
