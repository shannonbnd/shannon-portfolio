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
  const receiptHeight = isMobile ? 390 : 520;
  const receiptWidth = isMobile ? 156 : 214;
  const mainPanelHeight = isMobile ? 290 : 380;
  const straightTailHeight = isMobile ? 74 : 98;
  const loopTop = mainPanelHeight + straightTailHeight - (isMobile ? 4 : 6);
  const returnTop = loopTop + (isMobile ? 54 : 72);

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
            transform: translate3d(0, -4px, 0) scaleY(0.03) rotateX(14deg) rotateZ(0deg);
            filter: blur(0.5px);
          }
          10% {
            opacity: 1;
          }
          62% {
            transform: translate3d(0, 2px, 0) scaleY(0.82) rotateX(2deg) rotateZ(0deg);
            filter: blur(0);
          }
          84% {
            transform: translate3d(0, 1px, 0) scaleY(0.97) rotateX(0.4deg) rotateZ(0deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scaleY(1) rotateX(0deg) rotateZ(0deg);
            filter: blur(0);
          }
        }

        @keyframes receipt-settle {
          0% {
            transform: rotateZ(0deg);
          }
          45% {
            transform: rotateZ(-0.22deg);
          }
          100% {
            transform: rotateZ(0deg);
          }
        }

        @keyframes receipt-tail-grow {
          0% {
            opacity: 0;
            transform: scaleY(0.02);
          }
          12% {
            opacity: 1;
            transform: scaleY(0.04);
          }
          66% {
            opacity: 1;
            transform: scaleY(0.9);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes receipt-tail-front {
          0% {
            opacity: 0;
            transform: scaleY(0.04) rotateX(-2deg) translateY(-8px);
          }
          70% {
            opacity: 0;
            transform: scaleY(0.08) rotateX(-3deg) translateY(-8px);
          }
          86% {
            opacity: 1;
            transform: scaleY(0.82) rotateX(-10deg) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scaleY(1) rotateX(-16deg) translateY(0);
          }
        }

        @keyframes receipt-tail-back {
          0% {
            opacity: 0;
            transform: scaleY(0.04) rotateX(2deg) translateY(-8px);
          }
          78% {
            opacity: 0;
            transform: scaleY(0.06) rotateX(3deg) translateY(-8px);
          }
          92% {
            opacity: 1;
            transform: scaleY(0.8) rotateX(8deg) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scaleY(1) rotateX(14deg) translateY(0);
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
          top: isMobile ? "49%" : "53%",
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
            className="absolute overflow-visible pointer-events-auto will-change-transform"
            style={{
              position: "absolute",
              zIndex: 60,
              top: isMobile ? "12px" : "14px",
              left: 0,
              width: `${receiptWidth}px`,
              height: `${receiptHeight}px`,
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              transform: showTicket
                ? "translate3d(0, 0, 0) scaleY(1)"
                : "translate3d(0, -4px, 0) scaleY(0.03)",
              opacity: showTicket ? 1 : 0,
              borderRadius: "0px",
              filter: showTicket ? "blur(0)" : "blur(0.5px)",
              animation: showTicket
                ? "receipt-print 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards, receipt-settle 480ms ease-out 1380ms 1"
                : "none",
            }}
          >
            <div
              className="relative overflow-hidden border border-black/10 bg-[#fffef8]"
              style={{
                height: `${mainPanelHeight}px`,
                boxShadow: "0 18px 36px rgba(0, 0, 0, 0.14)",
              }}
            >
              <div className="border-b border-dashed border-black/20 px-3 pb-3 pt-4 text-center text-black">
                <div
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "9px" : "11px",
                    letterSpacing: "0.22em",
                    fontWeight: 700,
                  }}
                >
                  SHANNON BUNDHOO
                </div>
                <div
                  style={{
                    fontFamily: "'Source Code Pro', sans-serif",
                    fontSize: isMobile ? "7px" : "9px",
                    letterSpacing: "0.12em",
                    marginTop: "4px",
                    opacity: 0.72,
                  }}
                >
                  PROJECT RECEIPT
                </div>
              </div>

              <div className="px-2.5 pb-0 pt-2.5">
                <img
                  src={currentTicket.image}
                  alt={currentTicket.title}
                  className="block h-[96px] w-full object-cover md:h-[128px]"
                  draggable={false}
                />
              </div>

              <div className="px-2.5 py-2.5 text-black">
                <div className="flex items-start justify-between gap-3 border-b border-dashed border-black/20 pb-2">
                  <div>
                    <div
                      style={{
                        fontFamily: "'Source Code Pro', sans-serif",
                        fontSize: isMobile ? "14px" : "18px",
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
                        fontSize: isMobile ? "7px" : "9px",
                        marginTop: "5px",
                        opacity: 0.72,
                      }}
                    >
                      {currentTicket.subtitle.toUpperCase()}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Source Code Pro', sans-serif",
                      fontSize: isMobile ? "7px" : "9px",
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
                    fontSize: isMobile ? "7px" : "9px",
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
                    fontSize: isMobile ? "7px" : "9px",
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
                      fontSize: isMobile ? "7px" : "9px",
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
                          height: `${isMobile ? 20 : 28}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute left-[11%] border-x border-black/10 bg-[#fffef8]"
                style={{
                  top: `${mainPanelHeight - 1}px`,
                  width: "78%",
                  height: `${straightTailHeight}px`,
                  boxShadow: "0 10px 18px rgba(0, 0, 0, 0.05)",
                  transformOrigin: "top center",
                  animation: showTicket
                    ? "receipt-tail-grow 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                }}
              />
              <div
                className="absolute left-[6%] border border-black/10 bg-[#fffef8]"
                style={{
                  top: `${loopTop}px`,
                  width: "88%",
                  height: isMobile ? "56px" : "74px",
                  borderRadius: "999px",
                  animation: showTicket
                    ? "receipt-tail-front 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                  transformOrigin: "top center",
                  boxShadow: "0 10px 18px rgba(0, 0, 0, 0.06)",
                }}
              />
              <div
                className="absolute left-[18%] border-x border-black/10 bg-[#fffef8]"
                style={{
                  top: `${returnTop}px`,
                  width: "64%",
                  height: isMobile ? "44px" : "58px",
                  animation: showTicket
                    ? "receipt-tail-back 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                  transformOrigin: "top center",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.04)",
                }}
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
}
