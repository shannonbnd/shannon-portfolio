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
  const straightTailHeight = isMobile ? 86 : 114;
  const waveTop = mainPanelHeight + straightTailHeight - (isMobile ? 8 : 10);
  const rollTop = waveTop + (isMobile ? 64 : 84);

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
            transform: translate3d(0, -3px, 0) scaleY(0.02) rotateX(12deg) rotateZ(0deg);
            filter: blur(0.5px);
          }
          10% {
            opacity: 1;
          }
          60% {
            transform: translate3d(0, 2px, 0) scaleY(0.86) rotateX(1.5deg) rotateZ(0deg);
            filter: blur(0);
          }
          86% {
            transform: translate3d(0, 1px, 0) scaleY(0.98) rotateX(0.3deg) rotateZ(0deg);
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
          10% {
            opacity: 1;
            transform: scaleY(0.04);
          }
          76% {
            opacity: 1;
            transform: scaleY(0.98);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes receipt-wave-grow {
          0% {
            opacity: 0;
            transform: scale(0.96, 0.1) translateY(-12px);
          }
          74% {
            opacity: 0;
            transform: scale(0.96, 0.12) translateY(-12px);
          }
          92% {
            opacity: 1;
            transform: scale(0.98, 0.88) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1, 1) translateY(0);
          }
        }

        @keyframes receipt-roll-grow {
          0% {
            opacity: 0;
            transform: scaleX(0.4) scaleY(0.22) translateY(-4px);
          }
          86% {
            opacity: 0;
            transform: scaleX(0.42) scaleY(0.24) translateY(-4px);
          }
          96% {
            opacity: 1;
            transform: scaleX(0.9) scaleY(0.92) translateY(-1px);
          }
          100% {
            opacity: 1;
            transform: scaleX(1) scaleY(1) translateY(0);
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

              <div className="px-3 py-3 text-black">
                <div
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: isMobile ? "6px" : "8px",
                    lineHeight: 1.45,
                    whiteSpace: "pre-wrap",
                    opacity: 0.82,
                  }}
                >
                  {currentTicket.description}
                </div>

                <div className="mt-3 flex items-end justify-between border-b border-dashed border-black/20 pb-2">
                  <div>
                    <div
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: isMobile ? "16px" : "22px",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {currentTicket.title.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: isMobile ? "6px" : "8px",
                        opacity: 0.72,
                        marginTop: "4px",
                      }}
                    >
                      PARADOXE RADICAL
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Source Code Pro', monospace",
                      fontSize: isMobile ? "6px" : "8px",
                      textAlign: "right",
                      opacity: 0.72,
                    }}
                  >
                    <div>04/2026</div>
                    <div>01/2</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {[
                    "IMAGE KEYFRAME",
                    "PROJECT WORLD",
                    "DETAIL LAYER",
                    "VISUAL NOISE",
                    "ARCHIVE TRACE",
                  ].map((line, index) => (
                    <div
                      key={line}
                      className="flex items-center justify-between"
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: isMobile ? "6px" : "8px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      <span>{line}</span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="absolute left-1/2 origin-top overflow-hidden"
              style={{
                top: `${mainPanelHeight - 2}px`,
                width: `${receiptWidth}px`,
                height: `${straightTailHeight}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 overflow-hidden border-x border-black/10 bg-[#fffef8]"
                style={{
                  height: `${straightTailHeight}px`,
                  transformOrigin: "50% 0%",
                  boxShadow: "0 12px 18px rgba(0, 0, 0, 0.08)",
                  animation: showTicket
                    ? "receipt-tail-grow 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                }}
              />
            </div>

            <div
              className="absolute left-1/2 origin-top"
              style={{
                top: `${waveTop}px`,
                width: `${receiptWidth - (isMobile ? 10 : 14)}px`,
                height: isMobile ? "124px" : "168px",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="absolute inset-0 overflow-hidden border border-black/10 bg-[#fffef8]"
                style={{
                  borderRadius: "0 0 999px 999px / 0 0 70px 70px",
                  boxShadow: "0 12px 18px rgba(0, 0, 0, 0.08)",
                  animation: showTicket
                    ? "receipt-wave-grow 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                }}
              />
            </div>

            <div
              className="absolute left-1/2 origin-center"
              style={{
                top: `${rollTop}px`,
                width: `${receiptWidth - (isMobile ? 44 : 62)}px`,
                height: isMobile ? "26px" : "34px",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="absolute inset-0 border border-black/10 bg-[#f6f1e4]"
                style={{
                  borderRadius: "999px",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 12px rgba(0, 0, 0, 0.08)",
                  animation: showTicket
                    ? "receipt-roll-grow 1380ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
                    : "none",
                }}
              />
            </div>

            <div
              className="absolute inset-x-0 flex justify-center"
              style={{
                top: `${receiptHeight - (isMobile ? 28 : 36)}px`,
              }}
            >
              <div
                style={{
                  width: `${receiptWidth - (isMobile ? 16 : 22)}px`,
                  height: isMobile ? "16px" : "22px",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,0.95) 0 2px, transparent 2px 4px)",
                  opacity: 0.9,
                }}
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
}
