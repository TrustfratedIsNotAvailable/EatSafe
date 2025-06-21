import React from "react";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register-animation.json";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import { auth } from "../firebase.config";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { setUser, updateUserProfile, register } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateURL = (url) => /^(http|https):\/\/[^ "]+$/.test(url);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
  const validateName = (name) => name.length >= 2 && name.length <= 20;

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, email, photo, password, confirmPass } = Object.fromEntries(
      formData.entries()
    );

    if (!validateName(name))
      return setError("Name must be between 2 and 20 characters.");
    if (!validateEmail(email)) return setError("Invalid email address.");
    if (!validateURL(photo)) return setError("Invalid photo URL.");
    if (!validatePassword(password))
      return setError(
        "Password must be at least 6 characters and include both uppercase and lowercase letters."
      );
    if (password !== confirmPass) return setError("Passwords do not match.");

    setError("");

    register(email, password)
      .then(() =>
        updateUserProfile({
          displayName: name.trim() || "Anonymous",
          photoURL: photo.trim() || "/images/logo.png",
        })
      )
      .then(() => {
        const updatedUser = {
          ...auth.currentUser,
          displayName: name.trim(),
          photoURL: photo.trim(),
        };

        setUser(updatedUser);

        const savedUser = {
          name: updatedUser.displayName,
          email: updatedUser.email,
          photoURL: updatedUser.photoURL,
          uid: updatedUser.uid,
        };

        return axios.post("https://eatsafe-server.vercel.app/users", savedUser);
      })
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
        form.reset();
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl w-full p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg ${
          isDark ? "bg-gray-800 shadow-green-700" : "bg-white shadow-[#43AF50]"
        }`}
      >
        {/* Left: Lottie Animation */}
        {/* <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96">
            <Lottie animationData={registerAnimation} loop={true} />
          </div>
        </div> */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center">
  <div className="w-72 h-72 md:w-96 md:h-96">
    <Lottie animationData={registerAnimation} loop={true} />
  </div>
</div>


        {/* Right: Register Form */}
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
            <h3
              className={`font-semibold text-lg mb-1 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Create your account
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Please create your account to get started
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {["name", "email", "photo", "password", "confirmPass"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "photo"
                        ? "url"
                        : "text"
                    }
                    name={field}
                    placeholder={
                      field === "confirmPass"
                        ? "Confirm Password"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    required
                    className={`rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] ${
                      isDark
                        ? "bg-gray-700 text-white border border-gray-600"
                        : "border border-gray-300"
                    }`}
                  />
                )
              )}

              <input
                type="submit"
                value="Register"
                className="bg-[#1B5E20] text-white py-2 rounded-full hover:bg-[#388E3C] transition w-3/4 mx-auto"
              />
            </form>

            <div className="mt-4 text-sm">
              <span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Already have an account?
              </span>{" "}
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
