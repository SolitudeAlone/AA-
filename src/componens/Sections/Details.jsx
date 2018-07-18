import React, { Component } from "react";
import { NavBar } from "antd-mobile";
import { connect } from "react-redux";
import axios from "axios";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: this.props.match.params.id,
      datas: []
    };
  }
  render() {
    let { id, datas, data } = this.state;
    return (
      <section>
        <NavBar
          className="noe"
          mode="dark"
          leftContent={
            id === undefined
              ? "请选择一名用户"
              : data &&
                data.map((item, index) => {
                  if (item.name === id) {
                    return item.name;
                  }
                })
          }
          style={{ background: "#eeeeee", color: "#000" }}
        />
        <ul className="DetaulsUls">
          <li>
            <span>时间</span>
            <span>姓名</span>
            <span>金钱</span>
            <span>备注</span>
          </li>
          {datas &&
            datas.map((item, index) => {
              if (item.asyncValue === id) {
                return (
                  <li key={index}>
                    <span>{item.date}</span>
                    <span>{item.asyncValue}</span>
                    <span>{item.money}</span>
                    <span>{item.Remarks}</span>
                  </li>
                );
              }
            })}
        </ul>
      </section>
    );
  }
  componentDidMount() {
    let data = this.props.state.list.data;
    this.setState({ data: data });
    axios.get(`http://localhost:8000/SubmissionAdd`).then(res => {
      // 请求数据库   获取全部data数据
      this.setState({ datas: res.data.datas });
    });
  }
}

let mapState = state => {
  return {
    state
  };
};
let mapDispatch = dispatch => {
  return {};
};
Details = connect(
  mapState,
  mapDispatch
)(Details);

export default Details;
