import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


import Home from "../Containers/Home";
import TripsDetails from "../Containers/TripsDetails";
import MyTrips from "../Containers/my-trips";

//import PrivateRoute from './private-route' //todas estas rotas são privadas
import index from "../Containers/Admin";
import Paths from "../Containers/Admin/Paths"

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={TripsDetails} path="/detalhes/:id" />
                <Route exact component={MyTrips} path="/Viagens" />

                 <Route exact component={index} path={Paths.Reservations} /> 
                 <Route exact component={index} path={Paths.CreateTrips} /> 
            </Switch>
        </Router>
    )
}

export default Routes;
