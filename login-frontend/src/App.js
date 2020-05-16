import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import { Route, Switch , Link} from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import AuthService from './services/auth-service.js';

export default class App extends Component {
  state = {
    user: null,
    loading: true,
  };

  setUser = (user) => {
    this.setState({ user });
  };

  service = new AuthService();

  checkAuthenticated = () => {
    if (this.state.user === null) {
      this.service
        .isAuthenticated()
        .then((response) => {
          this.setState({
            user: response,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            user: false,
            loading: false,
          });
        });
    }
  };

  render() {
    this.checkAuthenticated();

    if (this.state.loading) {
      return <p>loading</p>;
    }
    if (this.state.user) {
      return (
        <>
          <h1>welcome {this.state.user.username}</h1>
          <Link to="/profile">see Profile</Link>
          <Link to="/edit">Edit Profile</Link>

          <Switch>
            <Route
              path="/profile"
              render={() => <Profile setUser={this.setUser} />}
            />
            {/* <Route
              path="/edit"
              render={() => <Edit setUser={this.setUser} />}
            /> */}
          </Switch>
        </>
      );
    }


  // render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route
            path="/login"
            render={() => <Login setUser={this.setUser} />}
          />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}
