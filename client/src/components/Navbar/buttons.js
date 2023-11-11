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
        name: "Acceder o Salir",
        link: "/acceder"
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