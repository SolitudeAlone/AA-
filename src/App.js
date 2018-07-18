import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/index.jsx";
import { BrowserRouter as Routers } from "react-router-dom";
import "antd-mobile/dist/antd-mobile.css";
import Wrap from "./componens/Wrap.jsx";
import "./App.css";
class App extends Component {
 
  render() {
    return (
      <Provider store={store}>
        <Routers>
          <div className="App">
            <Wrap />
          </div> 
        </Routers>
      </Provider>
    );
  }
}

export default App;
