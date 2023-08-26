import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ component, ...rest }) {
    const user = localStorage.getItem("Travel:userData")

    if (!user) {
        return (
            <Redirect to="/" />
        )
    }

    return <Route {...rest} component={component} />
}

export default PrivateRoute

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}