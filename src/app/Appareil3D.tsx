import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { PROJECTS } from "../data/projects";

type ProjectTicket = (typeof PROJECTS)[number];

const DESKTOP_CAMERA_ORBIT = "-5deg 84deg 12m";
const MOBILE_CAMERA_ORBIT = "-5deg 84deg 6m";
const DESKTOP_CAMERA_TARGET = "-3m 1.7m 0m";
const MOBILE_CAMERA_TARGET = "-3m 2m 0m";
const DESKTOP_FOV = "15deg";
const MOBILE_FOV = "15deg";

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

  return (
    <>
      <model-viewer
        ref={viewerRef}
        src="/appareil.glb"
        alt="Modèle 3D"
        camera-orbit={isMobile ? MOBILE_CAMERA_ORBIT : DESKTOP_CAMERA_ORBIT}
        field-of-view={isMobile ? MOBILE_FOV : DESKTOP_FOV}
        camera-target={isMobile ? MOBILE_CAMERA_TARGET : DESKTOP_CAMERA_TARGET}
        camera-controls={!isLocked}
        interaction-prompt="none"
        disable-zoom={isLocked}
        reveal="auto"
        poster="/poster-appareil.png"
        onLoad={() => {
          const viewer = viewerRef.current;
          if (!viewer) return;

          const mobile =
            typeof window !== "undefined" && window.innerWidth < 768;

          const orbit = mobile ? MOBILE_CAMERA_ORBIT : DESKTOP_CAMERA_ORBIT;
          const target = mobile ? MOBILE_CAMERA_TARGET : DESKTOP_CAMERA_TARGET;
          const fov = mobile ? MOBILE_FOV : DESKTOP_FOV;

          viewer.cameraOrbit = orbit;
          viewer.cameraTarget = target;
          viewer.fieldOfView = fov;

          setInitialCamera({
            orbit,
            target,
            fov,
          });
        }}
        className="absolute z-10 pointer-events-auto"
        style={{
          display: "block",
          background: "transparent",
          overflow: "visible",
          left: "50%",
          top: isMobile ? "55%" : "50%",
          width: isMobile ? "600px" : "1080px",
          height: isMobile ? "1000px" : "1920px",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        }}
      />

      <div
        className="absolute z-50 pointer-events-none overflow-visible"
        style={{
          left: "50%",
          top: isMobile ? "64%" : "57%",
          width: isMobile ? "145px" : "220px",
          height: isMobile ? "205px" : "300px",
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
              top: isMobile ? -12 : -28,
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
