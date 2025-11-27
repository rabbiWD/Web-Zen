'use client';

import React, { useState, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { signInWithGoogle, setLoading, setUser, loginUser, loading } =
    useContext(AuthContext);
  const router = useRouter();

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    specialChar: /[^A-Za-z0-9]/,
    minLength: /^.{6,}$/,
  };

  const validateField = (name, value) => {
    let message = "";
    if (name === "email") {
      if (!value.trim()) message = "Email is required.";
      else if (!patterns.email.test(value))
        message = "Enter a valid email address.";
    } else if (name === "password") {
      if (!patterns.minLength.test(value))
        message = "Password must be at least 6 characters.";
      else if (!patterns.uppercase.test(value))
        message = "Must contain at least one uppercase letter.";
      else if (!patterns.lowercase.test(value))
        message = "Must contain at least one lowercase letter.";
      else if (!patterns.specialChar.test(value))
        message = "Must include at least one special character.";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    validateField("email", formData.email);
    validateField("password", formData.password);
    if (!formData.email || !formData.password || errors.email || errors.password)
      return;

    setLoading(true);
    loginUser(formData.email, formData.password)
      .then((res) => {
        setUser(res.user);
        router.push("/");
        setLoading(false);
        toast.success("Login Successful!");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
          registrationType: "google",
        };

        fetch(`https://footwear-api-six.vercel.app/api/users`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("User Saved:", data));

        setLoading(false);
        setUser(newUser);
        toast.success("Login with Google Successful!");
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-sm backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-8 border border-white/30">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 transition ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-400 transition ${
                  errors.password ? "border-red-500" : ""
                } pr-10`}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between mb-2">
            <Link href="/forgot-password" className="text-green-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-xl py-2 text-gray-700 hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Register */}
        <p className="text-center mt-3 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-green-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
