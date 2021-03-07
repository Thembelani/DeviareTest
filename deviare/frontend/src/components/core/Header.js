import React from 'react';
import { connect } from 'react-redux';

import Redux from '../../store/redux/exports';


const Header = (props) => {

    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Deviare Test</a>
            { props.isAuthenticated && 
                <a type="button" className="btn btn-outline-secondary" onClick={()=>props.logoutUser()}>
                    { props.is_loading &&
                    <span className="spinner-border spinner-border-sm"> </span>
                    }
                    <span>Logout</span>
                </a>
            }
          </div>

        </nav>
     )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        is_loading: state.auth.is_loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser : () => dispatch(Redux.AuthActions.logoutRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);