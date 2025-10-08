import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("❌ " + error.message);

    alert(`✅ Welcome back, ${data.user.email}!`);
    navigate("/");
  }  

 async function handleGoogleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) console.error(error.message);
  else console.log("Redirecting to Google login...");
}


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>

      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>

      <button style={{...styles.button, backgroundColor: "#DB4437"}} onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      <p style={styles.text}>
        Don’t have an account? <Link to="/register">Sign Up</Link>
      </p>
      <p style={styles.text}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}

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
    marginBottom: "20px",
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
