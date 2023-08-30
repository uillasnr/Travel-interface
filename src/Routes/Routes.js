import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


import Home from "../Containers/Home";
import TripsDetails from "../Containers/TripsDetails";
import MyTrips from "../Containers/my-trips";

//import PrivateRoute from './private-route' //todas estas rotas são privadas
import Confirmation from "../Components/ComponentsDetails/Confirmation";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={TripsDetails} path="/detalhes/:id" />
                <Route exact component={MyTrips} path="/Viagens" />

              {/*   <Route exact component={Confirmation} path="/Confirmation" /> */}
            </Switch>
        </Router>
    )
}

export default Routes;
