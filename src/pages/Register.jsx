import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import "../Login.css"; // <-- IMPORTANT: We now import the same CSS

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // ✨ Add a loading state to prevent double-clicks
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault(); 
    setLoading(true); // ✨ Disable button

    // 1. Create the authentication user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password 
    });

    if (authError) {
      alert("❌ " + authError.message);
      setLoading(false); // ✨ Re-enable button on error
      return;
    }

    // ✨ --- THIS IS THE FIX --- ✨
    // 2. Create the corresponding profile row in 'users' table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users') // 👈 Your 'users' table
        .insert({ 
          // Assuming your 'users' table 'id' column is a UUID linked to auth.users.id
          id: authData.user.id, 
          email: authData.user.email,
          has_paid_fee: false // 👈 Set the default value
        });

      if (profileError) {
        // If profile creation fails, it's a serious issue.
        // You might want to delete the auth user or just alert them.
        console.error("Error creating user profile:", profileError);
        alert("❌ Registration succeeded but creating your profile failed. Please contact support.");
        setLoading(false); // ✨ Re-enable button
        return;
      }
    }
    // ✨ --- END OF FIX --- ✨

    // 3. Success
    alert("✅ Registration successful! Please check your email to verify.");
    setLoading(false); // ✨ Done
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

            {/* ✨ Disable button while loading */}
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
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