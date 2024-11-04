import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    console.log(location);
    const Admi = localStorage.getItem("Admi-id");
    const isLogged = location.state?.logged || false;
    if (!Admi) {
        return isLogged ? children : <Navigate to="/home" />;
    }
    return children;
};

export default PrivateRoute;

