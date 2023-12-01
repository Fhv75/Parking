import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute({ roles }) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();
  const isAuthenticated = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:5000/user/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserRole(response.data.rol);
        })
        .catch((error) => {
          console.error("Error al obtener el rol del usuario:", error);
        });
      if (roles && userRole && !roles.includes(userRole)) {
        navigate("/");
      }
    }
  }, [isAuthenticated, userId, roles, userRole, navigate]);

  return <Outlet />;
}

export default ProtectedRoute;
