import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import "@google/model-viewer/dist/model-viewer";
import AccueilImport from "../../imports/Accueil";
import ThemeToggle from "../components/ThemeToggle";
import { PROJECTS } from "../../data/projects";
import ResponsiveArtboard from "../components/ResponsiveArtboard";
import { HOME_LAYOUT } from "../homeLayout";
import Appareil3D from "../Appareil3D";

type ProjectTicket = (typeof PROJECTS)[number];

export default function Home() {
  const navigate = useNavigate();
  const viewerRef = useRef<any>(null);
  const initialCameraRef = useRef<{
    orbit: string;
    target: string;
    fov: string;
  } | null>(null);

  const [isPrinting, setIsPrinting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<ProjectTicket | null>(null);

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

// Assigning camera properties (viewer.fieldOfView = ...) lands on wrong
// values in model-viewer; only the attribute parsing path reproduces the
// opening framing. Attributes are ignored when the string is unchanged,
// so nudge the first number before restoring the exact configured value.
const forceCameraAttribute = async (
  viewer: any,
  name: string,
  value: string,
) => {
  const nudged = value.replace(
    /-?\d+(\.\d+)?/,
    (n) => `${parseFloat(n) + 0.0001}`,
  );

  if (nudged !== value) {
    viewer.setAttribute(name, nudged);
    if (typeof viewer.jumpCameraToGoal === "function") {
      viewer.jumpCameraToGoal();
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  viewer.setAttribute(name, value);
  if (typeof viewer.jumpCameraToGoal === "function") {
    viewer.jumpCameraToGoal();
  }
};

const restoreInitialCamera = async () => {
  const viewer = viewerRef.current;
  if (!viewer) return;

  const orbit = viewer.getAttribute("camera-orbit") ?? "0deg 90deg auto";
  const target = viewer.getAttribute("camera-target") ?? "auto auto auto";
  const fov = viewer.getAttribute("field-of-view") ?? "16deg";

  // Restore the field of view first: the "auto" orbit radius is resolved
  // against the current fov, so parsing the orbit under a stale fov lands
  // on the wrong distance.
  await forceCameraAttribute(viewer, "field-of-view", fov);
  await forceCameraAttribute(viewer, "camera-target", target);
  await forceCameraAttribute(viewer, "camera-orbit", orbit);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
};

  const resetHomeState = () => {
    setIsPrinting(false);
    setIsLocked(false);
    setShowTicket(false);
    setCurrentTicket(null);
    void restoreInitialCamera();
  };

  const handleTakePhoto = async () => {
    if (isPrinting) return;

    await restoreInitialCamera();

    setIsPrinting(true);
    setIsLocked(true);
    setShowTicket(false);

    const randomTicket = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    setCurrentTicket(randomTicket);
    setTimeout(() => {
      setShowTicket(true);
    }, 180);

    setTimeout(() => {
      setIsPrinting(false);
    }, 1550);
  };

  const handleTicketClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentTicket) return;

    navigate(currentTicket.route, {
      state: { from: "home-photo" },
    });
  };

  const handleBackdropClick = () => {
    resetHomeState();
  };

  return (
    <div className="relative flex h-[100dvh] w-full items-start justify-center bg-background px-0" style={{ overflowX: "clip" }}>
      <ResponsiveArtboard
        baseWidth={440}
        baseHeight={956}
        maxScale={2.4}
        className="relative h-[100dvh] self-start"
      >
        <div className="relative h-[956px] w-[440px] overflow-visible">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AccueilImport />
          </div>

          {showTicket && (
            <div
              className="absolute inset-0 z-30 bg-black/0"
              onClick={handleBackdropClick}
              aria-label="Fermer le ticket"
            />
          )}

          <Appareil3D
            viewerRef={viewerRef}
            isLocked={isLocked}
            currentTicket={currentTicket}
            showTicket={showTicket}
            onTicketClick={handleTicketClick}
            setInitialCamera={(camera) => {
              if (!initialCameraRef.current) {
                initialCameraRef.current = camera;
              }
            }}
          />

          <div className={`absolute z-20 ${HOME_LAYOUT.toggle}`}>
            <ThemeToggle />
          </div>

          <button
            onClick={() => navigate("/galerie")}
            className={`absolute z-20 cursor-pointer ${HOME_LAYOUT.gallery}`}
            aria-label="Galerie Portfolio"
          />

          <button
            onClick={() => navigate("/cv")}
            className={`absolute z-20 cursor-pointer ${HOME_LAYOUT.cv}`}
            aria-label="CV / QCM"
          />

          <button
            onClick={handleTakePhoto}
            className={`absolute z-20 cursor-pointer ${HOME_LAYOUT.photo}`}
            aria-label="Prendre en photo"
          />

          <button
            onClick={() => {
              window.location.href = "mailto:bundhoos29@gmail.com";
            }}
            className={`absolute z-20 cursor-pointer ${HOME_LAYOUT.email}`}
            aria-label="Email"
          />
        </div>
      </ResponsiveArtboard>
    </div>
  );
}
