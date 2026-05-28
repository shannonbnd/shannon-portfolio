import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const dismissSplash = () => setShowSplash(false);

  useEffect(() => {
    const timer = setTimeout(dismissSplash, 2600);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
        {videoFailed ? (
          <img
            src="/splash_screen.png"
            alt="Shannon Bundhoo"
            className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto object-contain"
          />
        ) : (
          <video
            autoPlay
            muted
            playsInline
            onEnded={dismissSplash}
            onError={() => setVideoFailed(true)}
            className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto object-contain"
          >
            <source src="/projects/splash.MOV" type="video/quicktime" />
            <source src="/projects/splash.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
