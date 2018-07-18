import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import HomePage from "./HomePage.jsx";
// import Details from "./Details.jsx";
// import Submission from "./Submission.jsx";
// import Settlement from "./Settlement.jsx";
import { LoadAsyncCom, Loading } from "../../tools/LoginAddasync.js";

let HomePage = LoadAsyncCom(() => import("./HomePage.jsx"), Loading);
let Details = LoadAsyncCom(() => import("./Details.jsx"), Loading);
let Submission = LoadAsyncCom(() => import("./Submission.jsx"), Loading);
let Settlement = LoadAsyncCom(() => import("./Settlement.jsx"), Loading);

class Sections extends Component {
  render() {
    return (
      <div className="Sections">
        <Switch>
          <Route path="/one/home" component={HomePage} />
          <Route path="/one/details/:id" component={Details} />
          <Route path="/one/details" component={Details} />
          <Route path="/one/submission" component={Submission} />
          <Route path="/one/settlement" component={Settlement} />
          <Redirect from="/one" to="/one/home" />
        </Switch>
      </div>
    );
  }
}

export default Sections;
