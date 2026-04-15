import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
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
  ticketAnimationKey: number;
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
  ticketAnimationKey,
  onTicketClick,
  setInitialCamera,
}: Appareil3DProps) {
  const [isMobile, setIsMobile] = useState(false);
  const ticketViewerRef = useRef<any>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const viewer = ticketViewerRef.current;
    if (!viewer || !showTicket) return;

    const restartAnimation = () => {
      if ("currentTime" in viewer) {
        viewer.currentTime = 0;
      }

      if (Array.isArray(viewer.availableAnimations) && viewer.availableAnimations[0]) {
        viewer.animationName = viewer.availableAnimations[0];
      }

      if (typeof viewer.play === "function") {
        viewer.play();
      }
    };

    if (viewer.loaded) {
      restartAnimation();
      return;
    }

    viewer.addEventListener("load", restartAnimation, { once: true });
    return () => {
      viewer.removeEventListener("load", restartAnimation);
    };
  }, [showTicket, ticketAnimationKey]);

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
          left: isMobile ? "54%" : "54%",
          top: isMobile ? "31%" : "38%",
          width: isMobile ? "520px" : "700px",
          height: isMobile ? "840px" : "1080px",
          transform: "translate(-50%, -50%)",
          marginTop: "0",
        }}
      />

      {currentTicket && showTicket && (
        <div
          className="absolute z-50 overflow-visible"
          style={{
            left: "50%",
            top: isMobile ? "49%" : "53%",
            width: isMobile ? "250px" : "340px",
            height: isMobile ? "520px" : "700px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <model-viewer
            key={`ticket-${ticketAnimationKey}-${isMobile ? "mobile" : "desktop"}`}
            ref={ticketViewerRef}
            src="/ticket-print.glb"
            alt={`Ticket du projet ${currentTicket.title}`}
            autoplay
            animation-crossfade-duration="0"
            interaction-prompt="none"
            disable-zoom
            camera-controls={false}
            shadow-intensity="1"
            exposure="1.1"
            camera-orbit={isMobile ? "90deg 90deg 1.7m" : "90deg 90deg 2.05m"}
            camera-target="0m -0.23m -2.05m"
            field-of-view="18deg"
            className="absolute inset-0 pointer-events-none"
            style={{
              display: "block",
              background: "transparent",
              overflow: "visible",
            }}
          />

          <button
            onClick={onTicketClick}
            type="button"
            aria-label={`Ouvrir le projet ${currentTicket.title}`}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: "50%",
              top: isMobile ? "16%" : "14%",
              width: isMobile ? "136px" : "180px",
              height: isMobile ? "210px" : "280px",
              transform: "translateX(-50%)",
              background: "transparent",
            }}
          />
        </div>
      )}
    </>
  );
}
