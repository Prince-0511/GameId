import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ghostId, setGhostId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error loading user:", error.message);
      }

      if (user) {
        setUser(user);
        await fetchGhostId(user.id);
      }

      setLoading(false); // ✅ Always stop loading
    }

    loadUser();

    // ✅ Auth state listener (v2 syntax)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchGhostId(session.user.id);
      } else {
        setUser(null);
        setGhostId(null);
      }
    });

    return () => {
      subscription.unsubscribe(); // ✅ correct cleanup
    };
  }, []);

  async function fetchGhostId(userId) {
    const { data: profile, error } = await supabase
      .from("users")
      .select("ghost_id")
      .eq("user_id", userId)
      .single();

    if (!error && profile) {
      setGhostId(profile.ghost_id);
    } else {
      console.error("Failed to fetch ghost_id:", error?.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, ghostId, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
