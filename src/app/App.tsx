import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 secondes

    return () => clearTimeout(timer);
  }, []);

     if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
        <img
          src="/splash_screen.png"
          alt="Splash screen"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
