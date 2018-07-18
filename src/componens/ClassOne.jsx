import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sectionss from "./Sections/Sectionss.jsx";
import { connect } from "react-redux";
import axios from "axios";
class ClassOne extends Component {
  render() {
    return (
      <div className="ClassOne">
        <header>
          <span> 三 </span>
        </header>
        <Sectionss />
        <footer>
          <Link to="/one/home"> 首页 </Link>
          <Link to="/one/details"> 详情 </Link>
          <Link to="/one/submission"> 提交 </Link>
          <Link to="/one/settlement"> 结算 </Link>
        </footer>
      </div>
    );
  }
  componentDidMount() {
    this.props.SubmissionAdd(); // 获取总数据 data
  }
}
let mapState = state => {
  return {
    state
  };
};
let mapDispatch = dispatch => {
  return {
    SubmissionAdd() {
      axios.get(`http://localhost:8000/SubmissionAdd`).then(res => {
        // 请求数据库   获取全部data数据
        let data = res.data.data;
        let datas = res.data.datas;

        dispatch({ type: "SUBMISSION", data,datas });
       
      });
    }
  };
};

ClassOne = connect(
  mapState,
  mapDispatch
)(ClassOne);
export default ClassOne;
