import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { supabase } from "./lib/supabase";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    alert("👋 Logged out successfully");
  }

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>

      <div style={{ padding: "10px", textAlign: "center" }}>
        {user ? (
          <h2>🎮Logged in as {user.email}</h2>
        ) : (
          <h2></h2>
        )}
      </div>

      <Routes>
        <Route path="/" element={<h1>Welcome To KreedaaX 👻</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
