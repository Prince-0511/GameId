import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Login.css"; // <-- IMPORTANT: We move CSS to external file

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("❌ " + error.message);

    alert(`✅ Welcome back, ${data.user.email}!`);

    if (location.state?.redirectToSell) {
      navigate("/sell");
    } else navigate("/");
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  }

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="container">
        <div className="login-card">
          <h1>Login</h1>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-field">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <i className="fa-solid fa-envelope icon-right"></i>
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-field">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <i className="fa-solid fa-lock icon-right"></i>
              </div>
            </div>

            <div className="options">
              <div></div>
              <Link to="/forgot-password">Forgot your Password?</Link>
            </div>

            <button className="login-button" type="submit">Login</button>
          </form>

          <div className="separator"><span>or</span></div>

          {/* ✅ Only Google Button */}
          <button className="google-button" onClick={handleGoogleLogin}>
            <i className="fa-brands fa-google"></i> Continue with Google
          </button>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>

       
      </div>
    </>
  );
}
