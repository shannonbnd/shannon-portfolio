import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5 secondes

    return () => clearTimeout(timer);
  }, []);

       if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
        <video
          src="/projects/splash.MOV"
          autoPlay
          muted
          playsInline
          className="w-[320px] sm:w-[380px] md:w-[440px] h-auto object-contain"
        />
      </div>
    );
  }


  return <RouterProvider router={router} />;
}

export default App;
