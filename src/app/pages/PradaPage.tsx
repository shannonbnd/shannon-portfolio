import PradaImport from "../../imports/Prada-1-1765";
import ProjectDetailPage from "../components/ProjectDetailPage";
import { useLocation, useNavigate } from "react-router";

export default function PradaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (location.state?.from === "home-photo") {
      navigate("/");
      return;
    }

    navigate("/galerie");
  };

  return (
    <ProjectDetailPage title="Prada" onBack={handleBack} artboardHeight={2057}>
      <div className="relative h-full w-full">
        <PradaImport />

        <div
          className="absolute overflow-hidden"
          style={{
            top: "556px",
            left: "50px",
            width: "340px",
            height: "220px",
            zIndex: 20,
          }}
        >
          <video
            src="/public/FINAL.mov"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover block"
          />
        </div>

        <div
          className="absolute overflow-hidden"
          style={{
            top: "970px",
            left: "11%",
            width: "343px",
            height: "500px",
            zIndex: 0,
          }}
        >
          <video
            src="/public/MOTIONTEASING.mov"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover block"
            style={{ objectPosition: "center center" }}
          />
        </div>
      </div>
    </ProjectDetailPage>
  );
}
