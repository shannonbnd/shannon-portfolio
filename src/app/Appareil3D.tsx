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
  const receiptHeight = isMobile ? 610 : 760;
  const receiptWidth = isMobile ? 176 : 252;

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
      <style>{`
        @keyframes receipt-print {
          0% {
            opacity: 0;
            transform: translate3d(0, -10px, 0) scaleY(0.05) rotateX(72deg) rotateZ(0deg);
            filter: blur(3px);
          }
          12% {
            opacity: 1;
          }
          48% {
            transform: translate3d(0, 6px, 0) scaleY(1.02) rotateX(8deg) rotateZ(0deg);
            filter: blur(0);
          }
          72% {
            transform: translate3d(0, 2px, 0) scaleY(0.995) rotateX(-2deg) rotateZ(0deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scaleY(1) rotateX(0deg) rotateZ(0deg);
            filter: blur(0);
          }
        }

        @keyframes receipt-settle {
          0%, 100% {
            transform: rotateZ(-0.4deg);
          }
          50% {
            transform: rotateZ(0.5deg);
          }
        }

        @keyframes receipt-fold-front {
          0%, 100% {
            transform: rotateX(-10deg) translateY(0);
          }
          50% {
            transform: rotateX(-22deg) translateY(-3px);
          }
        }

        @keyframes receipt-fold-back {
          0%, 100% {
            transform: rotateX(12deg) translateY(0);
          }
          50% {
            transform: rotateX(24deg) translateY(-2px);
          }
        }
      `}</style>
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

      <div
        className="absolute z-50 pointer-events-none overflow-visible"
        style={{
          left: "50%",
          top: isMobile ? "53%" : "58%",
          width: `${receiptWidth}px`,
          height: `${receiptHeight}px`,
          transform: "translate(-50%, -50%)",
          marginTop: "0",
          perspective: "1200px",
        }}
      >
        {currentTicket && (
          <button
            onClick={onTicketClick}
            type="button"
            aria-label={`Ouvrir le projet ${currentTicket.title}`}
            className="absolute overflow-hidden border border-black/10 bg-[#fffef8] pointer-events-auto will-change-transform"
            style={{
              position: "absolute",
              zIndex: 60,
              top: isMobile ? -8 : 0,
              left: 0,
              width: `${receiptWidth}px`,
              height: `${receiptHeight}px`,
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              transform: showTicket
                ? "translate3d(0, 0, 0) scaleY(1)"
                : "translate3d(0, -10px, 0) scaleY(0.05)",
              opacity: showTicket ? 1 : 0,
              borderRadius: "0px",
              filter: showTicket ? "blur(0)" : "blur(3px)",
              boxShadow: showTicket
                ? "0 24px 50px rgba(0, 0, 0, 0.16)"
                : "0 0 0 rgba(0, 0, 0, 0)",
              animation: showTicket
                ? "receipt-print 1300ms cubic-bezier(0.16, 1, 0.3, 1) forwards, receipt-settle 4200ms ease-in-out 1300ms infinite"
                : "none",
            }}
          >
            <div className="relative h-full w-full bg-[#fffef8]">
              <div className="border-b border-dashed border-black/20 px-3 pb-3 pt-4 text-center text-black">
                <div
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "10px" : "12px",
                    letterSpacing: "0.34em",
                    fontWeight: 700,
                  }}
                >
                  SHANNON BUNDHOO
                </div>
                <div
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "8px" : "10px",
                    letterSpacing: "0.18em",
                    marginTop: "6px",
                    opacity: 0.72,
                  }}
                >
                  PROJECT RECEIPT
                </div>
              </div>

              <div className="px-3 pb-0 pt-3">
                <img
                  src={currentTicket.image}
                  alt={currentTicket.title}
                  className="block h-[120px] w-full object-cover md:h-[148px]"
                  draggable={false}
                />
              </div>

              <div className="px-3 py-3 text-black">
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-black/20 pb-2">
                  <div>
                    <div
                      style={{
                        fontFamily: "'Source Code Pro', sans-serif",
                        fontSize: isMobile ? "18px" : "22px",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {currentTicket.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Source Code Pro', sans-serif",
                        fontSize: isMobile ? "8px" : "10px",
                        marginTop: "7px",
                        opacity: 0.72,
                      }}
                    >
                      {currentTicket.subtitle.toUpperCase()}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Source Code Pro', sans-serif",
                      fontSize: isMobile ? "8px" : "10px",
                      textAlign: "right",
                      opacity: 0.72,
                    }}
                  >
                    <div>04/2026</div>
                    <div>01/{PROJECTS.findIndex((project) => project.id === currentTicket.id) + 1}</div>
                  </div>
                </div>

                <div
                  className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-b border-dashed border-black/20 py-3"
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "8px" : "10px",
                    lineHeight: 1.5,
                  }}
                >
                  <span>IMAGE KEYFRAME</span>
                  <span>01</span>
                  <span>PROJECT WORLD</span>
                  <span>02</span>
                  <span>DETAIL LAYER</span>
                  <span>03</span>
                  <span>VISUAL NOISE</span>
                  <span>04</span>
                  <span>ARCHIVE TRACE</span>
                  <span>05</span>
                </div>

                <div
                  className="border-b border-dashed border-black/20 py-3"
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "8px" : "10px",
                    lineHeight: 1.55,
                  }}
                >
                  <p>{currentTicket.subtitle}</p>
                  <p className="mt-2 opacity-80">
                    Long thermal print prototype generated from the selected project.
                    The paper keeps printing until it invades the page.
                  </p>
                </div>

                <div className="flex items-end justify-between py-3">
                  <div
                    style={{
                      fontFamily: "'Source Code Pro', sans-serif",
                      fontSize: isMobile ? "8px" : "10px",
                      lineHeight: 1.45,
                    }}
                  >
                    <div>OPEN PROJECT</div>
                    <div className="opacity-65">{currentTicket.route}</div>
                  </div>
                  <div className="flex gap-[3px] opacity-80">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <span
                        key={index}
                        className="block bg-black"
                        style={{
                          width: `${(index % 3) + 1}px`,
                          height: `${isMobile ? 28 : 34}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-[-54px] left-[18px] rounded-[999px] border border-black/10 bg-[#fffef8] shadow-[0_18px_28px_rgba(0,0,0,0.08)]"
                style={{
                  width: `calc(100% - 36px)`,
                  height: isMobile ? "82px" : "104px",
                  animation: showTicket
                    ? "receipt-fold-front 2600ms ease-in-out 980ms infinite"
                    : "none",
                  transformOrigin: "top center",
                }}
              />
              <div
                className="absolute left-[30px] rounded-[999px] border border-black/10 bg-[#fffef8]/90 shadow-[0_10px_18px_rgba(0,0,0,0.05)]"
                style={{
                  bottom: isMobile ? "-16px" : "-22px",
                  width: `calc(100% - 60px)`,
                  height: isMobile ? "58px" : "70px",
                  animation: showTicket
                    ? "receipt-fold-back 3000ms ease-in-out 1080ms infinite"
                    : "none",
                  transformOrigin: "top center",
                }}
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
}
