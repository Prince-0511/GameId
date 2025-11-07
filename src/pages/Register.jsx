import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import "../Login.css"; // <-- IMPORTANT: We now import the same CSS

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault(); // <-- Add preventDefault for form submission

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("❌ " + error.message);

    alert("✅ Registration successful! Please check your email to verify.");
    navigate("/login"); // Navigate to login after successful sign up
  }

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="container">
        <div className="login-card">
          <h1>Sign Up</h1>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-field">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fa-solid fa-envelope icon-right"></i>
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="fa-solid fa-lock icon-right"></i>
              </div>
            </div>

            <button className="login-button" type="submit">
              Register
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}