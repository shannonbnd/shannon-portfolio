import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import imgArrowLeft from "../../asset/7d2368f3c3a31cd16aeac2daf236e488fd649629.png";
import ResponsiveArtboard from "./ResponsiveArtboard";

interface ProjectDetailPageProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  artboardHeight: number;
}

export default function ProjectDetailPage({
  children,
  onBack,
  artboardHeight,
}: ProjectDetailPageProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onBack) {
        onBack();
        return;
      }

      navigate("/galerie");
    }, 300);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />

      <motion.div
        initial={{ y: "100%", scale: 0.9 }}
        animate={{
          y: isVisible ? 0 : "100%",
          scale: isVisible ? 1 : 0.9,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
        }}
        className="fixed inset-0 z-50 bg-background overflow-hidden flex justify-center"
      >
        <button
          onClick={handleClose}
          className="fixed top-[50px] left-6 z-50 w-[40px] h-[30px] transition-opacity hover:opacity-70"
          aria-label="Fermer"
        >
          <img
            src={imgArrowLeft}
            alt="Retour"
            className="w-full h-full object-contain dark:invert dark:[filter:invert(1)_drop-shadow(0_0_2px_rgba(0,0,0,0.8))]"
          />
        </button>

        <div className="h-full w-full overflow-y-auto overflow-x-hidden px-0">
          <ResponsiveArtboard
            baseWidth={440}
            baseHeight={artboardHeight}
            className="mx-auto w-full"
          >
            {children}
          </ResponsiveArtboard>
        </div>
      </motion.div>
    </>
  );
}