import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


import Home from "./Containers/Home";
import Details from "./Containers/TripsDetails";


function Routes() {
    return (
        <Router>
            <Switch>
                 <Route exact component={Home} path="/" /> 
                <Route exact component={Details} path="/detalhes/:id" /> 
            </Switch>
        </Router>
    )
}

export default Routes;
