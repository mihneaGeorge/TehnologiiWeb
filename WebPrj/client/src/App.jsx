import React, { Component } from "react";
import {connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./components/Boards/Home";
import Profile from "./components/Authentication/Profile";
import BoardUser from "./components/Boards/UserBoard";

import { clearMessage } from "./actions/message";

import { history } from './util/history';
import ProjectList from "./components/Project/ProjectList";
import AddProject from "./components/Project/AddProject";
import ViewProject from "./components/Project/ViewProject";
import Navbar from "./components/Navbar";
import ViewGrades from "./components/Boards/ViewGrades";


class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }



  render() {
    return (
          <Router history={history}>
            <div>
                <Navbar/>
              <div className="container mt-3">
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/projects" component={ProjectList}/>
                  <Route path="/addProject" component={AddProject}/>
                  <Route path="/user" component={BoardUser} />
                  <Route path="/project/:id" component={ViewProject}/>
                  <Route path="/grades/:id" component={ViewGrades}/>
                </Switch>
              </div>
            </div>
          </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);