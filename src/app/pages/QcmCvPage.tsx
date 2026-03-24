import { useNavigate } from "react-router";
import imgArrowLeft from "../../asset/7d2368f3c3a31cd16aeac2daf236e488fd649629.png";
import ResponsiveArtboard from "../components/ResponsiveArtboard";

export default function QcmCvPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-background px-0">
      <button
        onClick={() => navigate("/")}
        className="fixed top-[50px] left-6 z-50 w-[40px] h-[30px] transition-opacity hover:opacity-70"
        aria-label="Retour"
      >
        <img
          src={imgArrowLeft}
          alt="Retour"
          className="w-full h-full object-contain dark:invert dark:[filter:invert(1)_drop-shadow(0_0_2px_rgba(0,0,0,0.8))]"
        />
      </button>

      <ResponsiveArtboard baseWidth={440} baseHeight={971} className="relative w-full">
        <div className="relative h-[971px] w-[440px] pt-[80px]">
          <img
            src="/CV_2026-alt_v1.png"
            alt="QCM CV"
            className="block w-full h-auto"
          />
        </div>
      </ResponsiveArtboard>
    </div>
  );
}