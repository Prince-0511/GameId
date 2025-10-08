import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleReset() {
    // Show a loading state or disable the button here if desired
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password", // URL where the user can reset their password
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("📧 Check your email for a password reset link!");
    }
    // Re-enable button or hide loading state here
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Forgot Password</h1>
      <p style={{...styles.text, marginTop: 0, marginBottom: "20px"}}>
        Enter your email and we'll send you a link to reset your password.
      </p>

      <input
        style={styles.input}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={styles.button} onClick={handleReset}>
        Send Reset Link
      </button>

      <p style={styles.text}>
        Remember your password? <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

// Re-using the same styles object from the Login component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "10px", // Adjusted margin for the subtitle
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "95%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
};