import React, { Component } from 'react'
//import './Signup.css'
import AuthService from '../../services/auth-service'
import {Redirect} from 'react-router-dom'
// import Profile from '../Profile/Profile'

export default class Signup extends Component {

    state = {
            username: '',
            password: '',
            campus:'',
            course:'',
            service: new AuthService(),
            submitted: false
    }

     handleSubmit = (e) => {
        e.preventDefault();
        this.state.service.signup(this.state.username, this.state.password)
        .then(user => {
          this.setState({submitted: true})
        })
        return <Redirect to='/profile'/>
    }

    handleInput = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value})
    }

    render() {

      if(this.state.submitted) {
        return <Redirect to='/login' />
      }
        return (
          <div>
            <div className="signup-container">
              <form
                className="signup-form"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleInput(e)}
                /><p></p>
                <label htmlFor="tagline">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleInput(e)}
                /><p></p>
                <label htmlFor="tagline">Campus</label>
                <select           
                  name="campus"
                  value={this.state.campus}
                  onChange={(e) => this.handleInput(e)}
                >
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Miami">Miami</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="México">México</option>
                    <option value="Sao Paulo">Sao Paulo</option>
                    <option value="Lisbon">Lisbon</option>
            
                </select>


                <p></p>

                <label htmlFor="tagline">Course</label>
                <select
                  
                  name="course"
                  value={this.state.course}
                  onChange={(e) => this.handleInput(e)}
                  >
                    <option value="web-dev">Web Dev</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="ux-ui">UX/UI</option>

                </select>

                <p></p>
                <button className="signup-button" type="submit">Create an account</button>
              </form>
            </div>
          </div>
        );
    }
}