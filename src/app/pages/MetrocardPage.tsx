import MetrocardImport from "../../imports/Metrocard";
import ProjectDetailPage from "../components/ProjectDetailPage";
import { useLocation, useNavigate } from "react-router";

export default function MetrocardPage() {
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
    <ProjectDetailPage title="Metrocard" onBack={handleBack} artboardHeight={1996}>
      <MetrocardImport />
    </ProjectDetailPage>
  );
}