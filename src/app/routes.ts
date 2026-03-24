import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import QcmCvPage from "./pages/QcmCvPage";
import MetrocardPage from "./pages/MetrocardPage";
import LoasisPage from "./pages/LoasisPage";
import SbPage from "./pages/SbPage";
import PopeyePage from "./pages/PopeyePage";
import PradaPage from "./pages/PradaPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/galerie",
    Component: Gallery,
  },
  {
    path: "/cv",
    Component: QcmCvPage,
  },
  {
    path: "/projet/metrocard",
    Component: MetrocardPage,
  },
  {
    path: "/projet/oasis",
    Component: LoasisPage,
  },
  {
    path: "/projet/sb",
    Component: SbPage,
  },
  {
    path: "/projet/popeye",
    Component: PopeyePage,
  },
  {
    path: "/projet/prada",
    Component: PradaPage,
  },
]);
