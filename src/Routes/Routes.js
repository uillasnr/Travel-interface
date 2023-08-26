import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


import Home from "../Containers/Home";
import TripsDetails from "../Containers/TripsDetails";
import MyTrips from "../Containers/my-trips";



function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={TripsDetails} path="/detalhes/:id" />
                <Route exact component={MyTrips} path="/Viagens" />
            </Switch>
        </Router>
    )
}

export default Routes;
