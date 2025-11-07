import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "./lib/supabase";

import Index from "./pages/Index";
import GameDetails from "./pages/GameDetails";
import SellPage from "./pages/SellPage";
import Games from "./pages/Games";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load the current user session
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) console.error("Error getting session:", error.message);
      setUser(session?.user ?? null);
    };

    fetchSession();

    // ✅ Auth state listener (Supabase v2 syntax)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // ✅ Proper cleanup (Supabase returns a listener object)
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Logout function
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      alert("👋 Logged out successfully!");
    } else {
      console.error("Logout error:", error.message);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Index/>}
            />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
