// https://medium.com/@tomlarge/private-routes-with-react-router-dom-28e9f40c7146

import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, redirect_url, isAuthenticated, ...rest }) => {
    return <Route { ...rest  } render={(_props) => {
        return (
            isAuthenticated ? 
            <Component { ..._props }/> :
            <Redirect to={{
                pathname: (redirect_url || '/login'),
                state: { from: _props.location }
            }}/>
        )}
    }/>
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}
export default connect(mapStateToProps, null)(PrivateRoute);
 