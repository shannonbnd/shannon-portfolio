import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
        <img
          src="/splash_screen.png"
          alt="Shannon Bundhoo"
          className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-auto object-contain"
        />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
