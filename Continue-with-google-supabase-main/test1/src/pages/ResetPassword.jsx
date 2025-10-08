import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");

  async function handleUpdatePassword() {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("✅ Password updated! You can now log in.");
      window.location.href = "/login";
    }
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <button onClick={handleUpdatePassword}>Update Password</button>
    </div>
  );
}
