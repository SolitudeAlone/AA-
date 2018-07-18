import React from "react";
import Component from "./shouldComponent.js"
export let LoadAsyncCom = (LodeFn, Loading) => {
  return class LoadAble extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Load: Loading
      };
    }
    render() {
      let { Load } = this.state;
      return <Load {...this.props} />;
    }
    componentDidMount() {
      LodeFn().then(res => {
        let Load = res.default;
        this.setState({ Load });
      });
    }
  };
};
export function Loading() {
  return (
    <div>
      <img src={require("../img/2.gif")} alt="" />
    </div>
  );
}
