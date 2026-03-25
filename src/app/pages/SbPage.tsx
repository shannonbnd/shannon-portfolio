import SbImport from "../../imports/Sb";
import ProjectDetailPage from "../components/ProjectDetailPage";
import { useLocation, useNavigate } from "react-router";

export default function SbPage() {
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
    <ProjectDetailPage title="SB" onBack={handleBack} artboardHeight={2057}>
      <SbImport />
    </ProjectDetailPage>
  );
}