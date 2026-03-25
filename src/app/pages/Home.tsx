import { useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import "@google/model-viewer/dist/model-viewer";
import AccueilImport from "../../imports/Accueil";
import ThemeToggle from "../components/ThemeToggle";
import { PROJECTS } from "../../data/projects";
import ResponsiveArtboard from "../components/ResponsiveArtboard";
import { HOME_LAYOUT } from "../homeLayout";

type ProjectTicket = (typeof PROJECTS)[number];

const BASE_CAMERA_ORBIT = "-5deg 82deg 2.4m";
const BASE_CAMERA_TARGET = "-0.4m 0m 0m";
const BASE_FOV = "28deg";

export default function Home() {
  const navigate = useNavigate();
  const viewerRef = useRef<any>(null);

  const [isPrinting, setIsPrinting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<ProjectTicket | null>(null);

  const resetHomeState = () => {
    setIsPrinting(false);
    setIsLocked(false);
    setShowTicket(false);
    setCurrentTicket(null);

    const viewer = viewerRef.current;
    if (viewer) {
      viewer.cameraOrbit = BASE_CAMERA_ORBIT;
      viewer.cameraTarget = BASE_CAMERA_TARGET;
      viewer.fieldOfView = BASE_FOV;
    }
  };

  const handleTakePhoto = () => {
    if (isPrinting || showTicket) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.cameraOrbit = BASE_CAMERA_ORBIT;
    viewer.cameraTarget = BASE_CAMERA_TARGET;
    viewer.fieldOfView = BASE_FOV;

    setIsPrinting(true);
    setIsLocked(true);

    const randomTicket = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    setCurrentTicket(randomTicket);

    setTimeout(() => {
      setShowTicket(true);
    }, 180);

    setTimeout(() => {
      setIsPrinting(false);
    }, 1500);
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
    <div className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-background px-0">
      <ResponsiveArtboard
        baseWidth={440}
        baseHeight={956}
        maxScale={2.4}
        className="relative w-full"
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

          <model-viewer
            ref={viewerRef}
            src="/appareil.glb"
            alt="Modèle 3D"
            camera-orbit={BASE_CAMERA_ORBIT}
            field-of-view={BASE_FOV}
            camera-target={BASE_CAMERA_TARGET}
            camera-controls={!isLocked}
            interaction-prompt="none"
            disable-zoom={isLocked}
            className="absolute z-[999] pointer-events-auto"
            style={{
              display: "block",
              background: "transparent",
              overflow: "visible",
              left: "50%",
              top: "50%",
              width: "1080px",
              height: "1920px",
              transform: "translate(-50%, -50%)",
            }}
          />

          <div
            className="absolute z-[1001] pointer-events-none overflow-visible"
            style={{
              left: "50%",
              top: "63%",
              width: "180px",
              height: "260px",
              transform: "translate(-50%, -50%)",
            }}
          >
            {currentTicket && (
              <button
                onClick={handleTicketClick}
                type="button"
                aria-label={`Ouvrir le projet ${currentTicket.title}`}
                className="absolute overflow-hidden border border-black/10 bg-white shadow-xl pointer-events-auto transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  top: -37,
                  left: 0,
                  width: "180px",
                  height: "225px",
                  transform: showTicket ? "translateY(8px)" : "translateY(-120px)",
                  opacity: showTicket ? 1 : 0,
                  borderRadius: "0px",
                }}
              >
                <img
                  src={currentTicket.image}
                  alt={currentTicket.title}
                  className="block h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            )}
          </div>

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
            onClick={() => {}}
            className={`absolute z-20 cursor-pointer ${HOME_LAYOUT.share}`}
            aria-label="Partager"
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
