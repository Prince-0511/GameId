import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load session and listen for changes
  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error.message);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ✅ Logout function
  async function handleLogout() {
    await supabase.auth.signOut();
    alert("👋 Logged out successfully!");
    setUser(null);
  }

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading user...</h2>;

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav style={styles.nav}>
        <Link to="/">Home</Link>
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && (
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      {/* ✅ Logged in status */}
      <div style={{ padding: "10px", textAlign: "center" }}>
        {user ? (
          <h2>🎮 Logged in as <span style={{ color: "#3b82f6" }}>{user.email}</span></h2>
        ) : (
          <h2>Welcome To Website</h2>
        )}
      </div>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

function Home({ user }) {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {user ? (
        <h1>👋 Welcome back, {user.email.split("@")[0]}!</h1>
      ) : (
        <h1>🏠 Please log in or register to continue.</h1>
      )}
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderBottom: "2px solid #e5e7eb",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;
