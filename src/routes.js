// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './pages/App';
import About from './pages/About';
import NotFound from './pages/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>
);

export default Routes;