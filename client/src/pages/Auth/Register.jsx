import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await register(
        formData.username,
        formData.email,
        formData.password
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Welcome to ConnectHub
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}