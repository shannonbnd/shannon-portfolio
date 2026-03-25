import { useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => setShowSplash(false)}
          className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto object-contain"
        >
          <source src="/projects/splash.MOV" type="video/quicktime" />
        </video>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
