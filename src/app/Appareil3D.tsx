import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { PROJECTS } from "../data/projects";

type ProjectTicket = (typeof PROJECTS)[number];

const DESKTOP_CAMERA_ORBIT = "-5deg 82deg -7m";
const MOBILE_CAMERA_ORBIT = "-5deg 82deg -5m";
const DESKTOP_CAMERA_TARGET = "-0.4m 3m 0m";
const MOBILE_CAMERA_TARGET = "-0.4m 0m 0m";
const BASE_FOV = "40deg";

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
        field-of-view={BASE_FOV}
        camera-target={isMobile ? MOBILE_CAMERA_TARGET : DESKTOP_CAMERA_TARGET}
        camera-controls={!isLocked}
        interaction-prompt="none"
        disable-zoom={isLocked}
        reveal="auto"
        poster="/poster-appareil.png"
        onLoad={() => {
          const viewer = viewerRef.current;
          if (!viewer) return;

          setInitialCamera({
            orbit: viewer.cameraOrbit,
            target: viewer.cameraTarget,
            fov: viewer.fieldOfView,
          });
        }}
        className="absolute z-[999] pointer-events-auto"
        style={{
          display: "block",
          background: "transparent",
          overflow: "visible",
          left: "50%",
          top: isMobile ? "55%" : "50%",
          width: isMobile ? "420px" : "1080px",
          height: isMobile ? "700px" : "1920px",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        }}
      />

      {currentTicket && (
        <div
          style={{
            position: "fixed",
            top: "120px",
            left: "120px",
            width: "220px",
            height: "280px",
            background: "yellow",
            border: "6px solid red",
            zIndex: 999999,
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={onTicketClick}
            type="button"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              background: "white",
              border: "4px solid blue",
            }}
          >
            <img
              src={currentTicket.image}
              alt={currentTicket.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              draggable={false}
            />
          </button>
        </div>
      )}
    </>
  );
}
