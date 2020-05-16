import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import Signup from './Signup/Signup';
// import Login from './Login/Login';



export default class Home extends Component {

    render() {

        return (
            <div>
            <h1>Homepage</h1>
             <Link to="/signup" className="button" >  SignUp </Link><p></p><p></p>
             <Link to="/login" className="button" > Log in </Link>
            </div>
        )
    }
}
