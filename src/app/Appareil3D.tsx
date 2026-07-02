import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { PROJECTS } from "../data/projects";

type ProjectTicket = (typeof PROJECTS)[number];

const DESKTOP_CAMERA_ORBIT = "0deg 90deg auto";
const MOBILE_CAMERA_ORBIT = "0deg 90deg auto";
const DESKTOP_CAMERA_TARGET = "auto auto auto";
const MOBILE_CAMERA_TARGET = "auto auto auto";
const DESKTOP_FOV = "16deg";
const MOBILE_FOV = "16deg";

type Appareil3DProps = {
  viewerRef: RefObject<any>;
  isLocked: boolean;
  currentTicket: ProjectTicket | null;
  showTicket: boolean;
  onTicketClick: (e: MouseEvent<HTMLButtonElement>) => void;
  setInitialCamera: (camera: {
    orbit: string;
    target: string;
    fov: string;
  }) => void;
};

export default function Appareil3D({
  viewerRef,
  isLocked,
  currentTicket,
  showTicket,
  onTicketClick,
  setInitialCamera,
}: Appareil3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // React 18 does not attach onLoad handlers to custom elements, so listen
  // for model-viewer's "load" event manually to capture the initial camera.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const captureInitialCamera = async () => {
      const mobile = typeof window !== "undefined" && window.innerWidth < 768;

      const orbit = mobile ? MOBILE_CAMERA_ORBIT : DESKTOP_CAMERA_ORBIT;
      const target = mobile ? MOBILE_CAMERA_TARGET : DESKTOP_CAMERA_TARGET;
      const fov = mobile ? MOBILE_FOV : DESKTOP_FOV;

      try {
        // The JSX attributes already define the opening framing. Wait for
        // model-viewer to finish applying them (framing is async), snap any
        // in-flight interpolation, then read back the resolved values.
        // Capturing too early recorded a pre-framing zoom level, which made
        // the reset land far from the opening view.
        if (viewer.updateComplete) {
          await viewer.updateComplete;
        }

        if (typeof viewer.jumpCameraToGoal === "function") {
          viewer.jumpCameraToGoal();
        }

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => resolve());
        });

        setInitialCamera({
          orbit: viewer.getCameraOrbit().toString(),
          target: viewer.getCameraTarget().toString(),
          fov: `${viewer.getFieldOfView()}deg`,
        });
      } catch {
        setInitialCamera({ orbit, target, fov });
      }
    };

    if (viewer.loaded) {
      captureInitialCamera();
    }

    viewer.addEventListener("load", captureInitialCamera);
    return () => viewer.removeEventListener("load", captureInitialCamera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <model-viewer
        ref={viewerRef}
        src="/appareil.glb"
        alt="Modèle 3D"
        scale={isMobile ? "1.2 1.2 1.2" : "0.95 0.95 0.95"}
        camera-orbit={isMobile ? MOBILE_CAMERA_ORBIT : DESKTOP_CAMERA_ORBIT}
        field-of-view={isMobile ? MOBILE_FOV : DESKTOP_FOV}
        camera-target={isMobile ? MOBILE_CAMERA_TARGET : DESKTOP_CAMERA_TARGET}
        camera-controls={!isLocked}
        interaction-prompt="none"
        disable-zoom={isLocked}
        reveal="auto"
        poster="/poster-appareil.png"
        className="absolute z-10 pointer-events-auto"
        style={{
          display: "block",
          background: "transparent",
          overflow: "visible",
          left: isMobile ? "53%" : "50%",
          top: "45%",
          width: isMobile ? "520px" : "700px",
          height: isMobile ? "840px" : "1080px",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        }}
      />

      <div
        className="absolute z-50 pointer-events-none overflow-visible"
        style={{
          left: "50%",
          top: isMobile ? "52%" : "57%",
          width: isMobile ? "145px" : "220px",
          height: isMobile ? "200px" : "330px",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        }}
      >
        {currentTicket && (
          <button
            onClick={onTicketClick}
            type="button"
            aria-label={`Ouvrir le projet ${currentTicket.title}`}
            className="absolute overflow-hidden border border-black/10 bg-white shadow-xl pointer-events-auto transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              position: "absolute",
              zIndex: 60,
              top: isMobile ? -30 : -10,
              left: 0,
              width: isMobile ? "145px" : "220px",
              height: isMobile ? "185px" : "275px",
              transform: showTicket ? "translateY(8px)" : "translateY(-90px)",
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
    </>
  );
}
