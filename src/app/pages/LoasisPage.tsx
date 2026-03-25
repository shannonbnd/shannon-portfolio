import LoasisImport from "../../imports/Loasis";
import ProjectDetailPage from "../components/ProjectDetailPage";
import { useLocation, useNavigate } from "react-router";

export default function LoasisPage() {
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
    <ProjectDetailPage title="L'Oasis" onBack={handleBack} artboardHeight={2057}>
      <LoasisImport />
    </ProjectDetailPage>
  );
}