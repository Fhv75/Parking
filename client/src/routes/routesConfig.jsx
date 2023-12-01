import Home from "../pages/Home";
import Profile from "../pages/Profile";
import VehiclesMenu from "../pages/VehiclesMenu";
import ProtectedRoute from "./ProtectedRoute";
import VehicleManagement from "../pages/VehicleManagement";
import UserManagement from "../pages/UserManagement";

const routes = [
  {
    path: "/",
    component: <Home />,
    protection: <ProtectedRoute roles={
      [
        "alumno",
        "docente",
        "funcionario"
      ]
    } />,
  },
  {
    path: "vehiculos",
    component: <VehiclesMenu />,
    protection: <ProtectedRoute roles={
      [
        "alumno",
        "docente",
        "funcionario"
      ]
    } />
  },
  {
    path: "perfil",
    component: <Profile />,
    protection: <ProtectedRoute roles={
      [
        "alumno",
        "docente",
        "funcionario"
      ]
    } />
  },
  {
    path: "gestionarVehiculos",
    component: <VehicleManagement />,
    protection: <ProtectedRoute roles={[
      "admin"
    ]} />
  },
  {
    path: "gestionarUsuarios",
    component: <UserManagement />,
    protection: <ProtectedRoute roles={
      [
        "admin"
      ]
    } />
  }
];

export default routes;
