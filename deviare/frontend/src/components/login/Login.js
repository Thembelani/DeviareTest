import './styles/login.scss';

import React, { useState } from 'react';
import { connect } from 'react-redux'; 
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'validator';


import Redux from '../../store/redux/exports';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-warning" role="alert">
          This field is required!
        </div>
      );
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return (<div className="alert alert-warning" role="alert">
            {value} is not a valid email.
        </div>) 
    }
};

const lt = (value, props) => {
    if (!value.toString().trim().length > props.maxLength) {
        return (<div className="alert alert-warning" role="alert">
            The value exceeded {props.maxLength} symbols.
        </div>)
    }
};

const Login = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const handleLogin = (e) =>  {
        e.preventDefault();

        if (!props.locked) {
            props.loginUser(username, password)
        }
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    return (
        <div className="container mt-3 main-container">
            <h2 className="text-center">Login Page</h2>
            <div className="form-container">
                <Form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="Username">Username</label>
                        <Input
                        type="text"
                        className="form-control field"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, email]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                        type="password"
                        className="form-control field"
                        name="password"
                        value={password}
                        maxLength={20}
                        onChange={onChangePassword}
                        validations={[required,lt]}
                        />
                    </div>

                    <div className="form-group">
                        { !props.locked && <Button className="btn btn-primary btn-block" disabled={props.is_loading}>
                        {props.is_loading && (
                            <span className="spinner-border spinner-border-sm"> </span>
                        )}
                        <span>Login</span>
                        </Button>}
                    </div>

                    { props.message && (
                        <div className="form-group message">
                        <div className="alert alert-danger" role="alert">
                            { props.message }
                        </div>
                        </div>
                    )}

                    { props.locked && (
                        <div className="form-group message">
                        <div className="alert alert-danger" role="alert">
                            Too many failed attempts. Try again later.
                        </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
                    
    )
}

const mapStateToProps = state => {
    return {
        is_loading: state.auth.is_loading,
        locked: state.auth.locked,
        attempts: state.auth.attempts,
        attempt_ts: state.auth.ts,
        message: state.auth.message
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loginUser: (username, password) => dispatch(Redux.AuthActions.loginRequest(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);