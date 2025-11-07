import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) console.error("Error loading user:", error.message);

        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Unexpected error loading user:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    // ✅ Proper Supabase v2 auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // ✅ Proper cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
