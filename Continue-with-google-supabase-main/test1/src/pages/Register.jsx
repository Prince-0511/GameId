import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("❌ Registration failed: " + error.message);
    } else {
      alert("✅ Signup successful! Please verify your email.");
      navigate("/login"); // go to login after signup
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
