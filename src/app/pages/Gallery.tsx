import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import GaleriePortfolioImport from "../../imports/GaleriePortfolio";
import imgArrowLeft from "../../asset/7d2368f3c3a31cd16aeac2daf236e488fd649629.png";
import ResponsiveArtboard from "../components/ResponsiveArtboard";

type ProjectCard = {
  id: string;
  path: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

const GALLERY_ARTBOARD_WIDTH = 440;
const GALLERY_ARTBOARD_HEIGHT = 1650;

function DesktopProjectCard({
  project,
  onClick,
}: {
  project: ProjectCard;
  onClick: (path: string) => void;
}) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateScale = () => {
      const nextScale = element.clientWidth / project.width;
      setScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [project.height, project.width]);

  return (
    <button
      ref={containerRef}
      onClick={() => onClick(project.path)}
      className="relative w-full overflow-hidden text-left transition-transform duration-300 hover:scale-[1.015]"
      style={{ height: `${project.height * scale}px` }}
      aria-label={`Voir le projet ${project.id}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: `${GALLERY_ARTBOARD_WIDTH}px`,
            height: `${GALLERY_ARTBOARD_HEIGHT}px`,
            transform: `translate(${-project.left * scale}px, ${-project.top * scale}px) scale(${scale})`,
          }}
        >
          <GaleriePortfolioImport />
        </div>
      </div>
      <span className="sr-only">Cliquez pour voir {project.id}</span>
    </button>
  );
}

export default function Gallery() {
  const navigate = useNavigate();

  const projects: ProjectCard[] = [
    { id: "prada", path: "/projet/prada", top: 36, left: 21, width: 395, height: 281 },
    { id: "metrocard", path: "/projet/metrocard", top: 365, left: 23, width: 395, height: 281 },
    { id: "oasis", path: "/projet/oasis", top: 694, left: 33, width: 375, height: 262 },
    { id: "sb", path: "/projet/sb", top: 1004, left: 23, width: 395, height: 281 },
    { id: "popeye", path: "/projet/popeye", top: 1333, left: 21, width: 395, height: 281 },
  ];

  const handleProjectClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background px-0 lg:px-10 lg:py-10">
      <button
        onClick={() => navigate("/")}
        className="fixed left-6 top-[50px] z-50 h-[30px] w-[40px] transition-opacity hover:opacity-70 lg:left-10 lg:top-10"
        aria-label="Retour"
      >
        <img 
          src={imgArrowLeft} 
          alt="Retour" 
          className="w-full h-full object-contain dark:invert dark:[filter:invert(1)_drop-shadow(0_0_2px_rgba(0,0,0,0.8))]"
        />
      </button>

      <div className="flex w-full justify-center lg:hidden">
        <ResponsiveArtboard baseWidth={440} baseHeight={1650} className="relative w-full">
          <div className="relative h-[1650px] w-[440px]">
            <GaleriePortfolioImport />

            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project.path)}
                className="absolute cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  top: `${project.top}px`,
                  left: `${project.left}px`,
                  width: `${project.width}px`,
                  height: `${project.height}px`,
                }}
                aria-label={`Voir le projet ${project.id}`}
              >
                <span className="sr-only">Cliquez pour voir {project.id}</span>
              </button>
            ))}
          </div>
        </ResponsiveArtboard>
      </div>

      <div className="mx-auto hidden w-full max-w-[1400px] lg:block lg:pt-8">
        <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
          {projects.map((project) => (
            <DesktopProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}