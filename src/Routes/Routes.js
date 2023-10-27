import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from '../Routes/private-routes';
import Paths from "../Containers/Admin/Paths";

import Home from "../Containers/Home";
import TripsDetails from "../Containers/TripsDetails";
import MyTrips from "../Containers/my-trips";
import Admin from "../Containers/Admin";
import Search from "../Containers/Search";
import ListCategory from "../Containers/ListCategory";


function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={TripsDetails} path="/detalhes/:id" />
                <Route exact component={MyTrips} path="/Viagens" />
                <Route exact component={Search} path="/Busca" />
                <Route exact component={ListCategory} path="/categories/:categoryId" />


                {/* Rota para administradores */}
                <PrivateRoute exact component={Admin} path={Paths.Reservations} isAdmin />
                <PrivateRoute exact component={Admin} path={Paths.CreateTrips} isAdmin />
                <PrivateRoute exact component={Admin} path={Paths.CreateCategory} isAdmin />
                <PrivateRoute exact component={Admin} path={Paths.UpdateCategory} isAdmin />
                <PrivateRoute exact component={Admin} path={Paths.AllTrips} isAdmin />
            </Switch>
        </Router>
    );
}

export default Routes;
