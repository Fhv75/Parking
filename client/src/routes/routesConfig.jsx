import Home from "../pages/Home";
import VehiclesMenu from "../pages/VehiclesMenu";

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "vehiculos",
    component: <VehiclesMenu />,
  }
];

export default routes;
