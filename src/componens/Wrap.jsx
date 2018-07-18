import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ClassOne from "./ClassOne.jsx";
import ClassTwo from "./ClassTwo.jsx";

class Wrap extends Component {
  render() {
    return (
      <div className="Wrap">
        <Switch>
          <Route path="/one" component={ClassOne} />
          <Route path="/two" component={ClassTwo} />
          <Redirect from="/" to="/one" />
        </Switch>
      </div>
    );
  }
}

export default Wrap;
