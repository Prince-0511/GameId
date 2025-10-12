import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      },
      {
        redirectTo: "http://localhost:8080/",
      }
    );

    if (error) {
      alert("Login failed 😢: " + error.message);
    } else {
      alert("Login successful 🎉");
      navigate("/"); // 👈 Redirect to homepage in frontend
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
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
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-400 underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
