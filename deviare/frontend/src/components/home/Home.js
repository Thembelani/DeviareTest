import './styles/home.scss';

import React from 'react';
import { connect } from 'react-redux'; 

import Redux from '../../store/redux/exports';

const Home = (props) => {
    return (
        <div className="container mt-3 main-container">
            <h2 className="text-center">Welcome to Deviare</h2>
        </div>
    )
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(Redux.AuthActions.logoutRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)