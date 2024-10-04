
import { Route, Navigate } from "react-router-dom";

const routePrivate = ({children, isAdmi}) => {
  return isAdmi ? children : <Navigate to={"/home"}/>
}

export default routePrivate
