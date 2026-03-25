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
        <video
          src="/public/projects/splash.MOV"
          autoPlay
          muted
          playsInline
          onEnded={() => setShowSplash(false)}
          className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-auto object-contain"
        />
      </div>
    );
  }


  return <RouterProvider router={router} />;
}

export default App;
