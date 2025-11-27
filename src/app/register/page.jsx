"use client";

import React, { useState, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { signInWithGoogle, createUser, updateUserProfile, signOutUser, setLoading, loading } =
    useContext(AuthContext);
  const router = useRouter();

  const patterns = {
    name: /^[A-Za-z\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    photoURL: /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    specialChar: /[^A-Za-z0-9]/,
    minLength: /^.{6,}$/,
  };

  const validateField = (name, value) => {
    let message = "";

    if (name === "name") {
      if (!value.trim()) message = "Name is required.";
      else if (!patterns.name.test(value)) message = "Name must be at least 3 letters.";
    } else if (name === "email") {
      if (!value.trim()) message = "Email is required.";
      else if (!patterns.email.test(value)) message = "Enter a valid email address.";
    } else if (name === "photoURL") {
      if (value && !patterns.photoURL.test(value))
        message = "Please enter a valid URL (e.g., https://example.com).";
    } else if (name === "password") {
      if (!patterns.minLength.test(value)) message = "Password must be at least 6 characters.";
      else if (!patterns.uppercase.test(value)) message = "Must contain at least one uppercase letter.";
      else if (!patterns.lowercase.test(value)) message = "Must contain at least one lowercase letter.";
      else if (!patterns.specialChar.test(value)) message = "Must include at least one special character.";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("photoURL", formData.photoURL);
    validateField("password", formData.password);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      errors.name ||
      errors.email ||
      errors.photoURL ||
      errors.password
    )
      return;

    setLoading(true);

    const { name: displayName, photoURL, email, password } = formData;

    createUser(email, password)
      .then((res) => {
        updateUserProfile(displayName, photoURL)
          .then(() => {
            const newUser = {
              displayName,
              photoURL,
              email,
              accessToken: res.user.accessToken,
              registrationType: "manual",
            };

            fetch(`https://footwear-api-six.vercel.app/api/users`, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => console.log("User saved:", data));

            signOutUser();
            toast.success("Signup Successful! Please log in.");
            setLoading(false);
            router.push("/login");
          })
          .catch((e) => toast.error(e.message));
      })
      .catch((e) => {
        console.log(e.code);
        const codeMessages = {
          "auth/email-already-in-use": "User already exists.",
          "auth/weak-password": "Password must be at least 6 characters.",
          "auth/invalid-email": "Invalid email address.",
          "auth/user-disabled": "Account disabled. Contact support.",
        };
        toast.error(codeMessages[e.code] || e.message);
        setLoading(false);
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
          .then((data) => console.log("Google user saved:", data));

        setLoading(false);
        toast.success("Signed in with Google!");
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Photo URL (Optional)</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition ${
                errors.photoURL ? "border-red-500" : ""
              }`}
            />
            {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-green-400 transition pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShow(!show)}
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 font-semibold">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google SignIn */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-xl py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          <svg aria-label="Google logo" width="20" height="20" viewBox="0 0 512 512">
            <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
            <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
            <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
          </svg>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm pt-5 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
