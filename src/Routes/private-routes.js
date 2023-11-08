import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Paths from "../Containers/Admin/Paths";
import { useUser } from "../hooks/UserContext";

function PrivateRoute({ component: Component, isAdmin, ...rest }) {
  const { user } = useUser(); 

  
  if (!user) {
    return <Redirect to="/" />;
  }

  // Verifique se o usuário é um administrador e está autorizado a acessar rotas privadas
  if (isAdmin && !user.user.admin) {
    return <Redirect to={Paths.Reservations} />;
  }

  // Se o usuário estiver autenticado e atender aos requisitos, renderize o componente
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool,
};

export default PrivateRoute;
