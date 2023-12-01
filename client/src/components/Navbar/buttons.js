const buttons = [{
        name: "Iniciar Sesión",
        type: "login"
    },
    {
        name: "Registrarse",
        type: "register"
    },
    {
        name: "Mis Vehiculos",
        link: "/vehiculos"
    },
    {
        name: "Mi Perfil",
        link: "/perfil"
    },
    {
        name: "Peticiones",
        link: "/peticiones",
        admin: true
    },
    {
        name: "Gestionar Vehiculos",
        link: "/gestionarVehiculos",
        admin: true
    },
    {
        name: "Gestionar Usuarios",
        link: "/gestionarUsuarios",
        admin: true
    },
    {
        name: "Cerrar Sesión",
        link: "/",
        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/";
        }
    },
];

export default buttons