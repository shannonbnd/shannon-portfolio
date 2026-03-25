import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import SplashVideo from "..public/projects/splash.MOV";

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
          src={splashVideo}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
