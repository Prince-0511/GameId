import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [   "localhost", ".lhr.life"],
    
    // 👇 This ensures Vite falls back to index.html for React Router
    middlewareMode: false,
    setupMiddlewares(middlewares: { use: (arg0: any) => void; }) {
      middlewares.use(history());
      return middlewares;
    },
  },
  preview: {
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
function history(): any {
  throw new Error("Function not implemented.");
}

