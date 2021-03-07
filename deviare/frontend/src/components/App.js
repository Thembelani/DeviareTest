import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';


import PrivateRoute from './utils/PrivateRoute';
import Header from './core/Header';
import Footer from './core/Footer';
import LoginPage from './login/Login';
import HomePage from './home/Home';

import Store from './utils/StoreWrapper';
import { history } from '../store';

console.log(history)
const App  = () => {
    return (
        <Store>
            <Router>
                <ConnectedRouter history={ history }>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={()=> (<Redirect to="/login"/>)}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <PrivateRoute exact path="/home" component={HomePage}/>
                    </Switch>
                    {/* <Footer /> */}
                </ConnectedRouter>
            </Router>
        </Store>
    )
}

ReactDom.render(<App />, document.getElementById('app'));


