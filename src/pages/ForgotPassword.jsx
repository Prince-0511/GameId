import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom"; // Import Link
import "../Login.css"; // <-- Import the shared CSS

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleReset(e) {
    e.preventDefault(); // <-- Add preventDefault for form submission

    // Make sure to update this URL to your production URL when you deploy
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // Page to redirect to after clicking link
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("📧 Check your email for a password reset link!");
    }
  }

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src="/video.mp4" type="video/mp4" />
      </video>

      <div className="container">
        <div className="login-card">
          <h1>Forgot Password</h1>
          <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={handleReset}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-field">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <i className="fa-solid fa-envelope icon-right"></i>
              </div>
            </div>

            <button className="login-button" type="submit">
              Send Reset Link
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Remembered your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}