import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  async function handleReset() {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/forgotpassword", // where user goes after clicking email link
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("📧 Check your email for a password reset link!");
    }
  }

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleReset}>Send Reset Link</button>
    </div>
  );
}
