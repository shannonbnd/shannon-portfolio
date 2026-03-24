import PopeyeImport from "../../imports/Popeye";
import ProjectDetailPage from "../components/ProjectDetailPage";
import { useLocation, useNavigate } from "react-router";

export default function PopeyePage() {
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
    <ProjectDetailPage title="Popeye" onBack={handleBack} artboardHeight={2057}>
      <PopeyeImport />
    </ProjectDetailPage>
  );
}