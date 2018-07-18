import React, { Component } from "react";
import { NavBar, Icon, InputItem, List, Button } from "antd-mobile";
import { connect } from "react-redux";
import axios from "axios";
class ClassTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ishow: false,
      ishows: false,
      id: "",
      name: "",
      price: "",
      modifyName: "",
      listID: 0,
      ishowdask: null,
      index: 0
    };
  }
  render() {
    let {
      ishow,
      id,
      name,
      price,
      ishows,
      modifyName,
      listID,
      ishowdask,
      index
    } = this.state;
    let { data } = this.props.state.list;
    return (
      <div className="ClassTwo">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.push("/one/home")}
          className="Headers"
          rightContent={[
            <Icon
              key="0"
              type="plus"
              style={{ marginRight: "16px" }}
              onClick={() => {
                this.setState({ ishow: true, ishows: false });
              }}
            />
          ]}
        >
          用户管理
        </NavBar>
        <div style={{ display: ishow ? "block" : "none" }} className="dask">
          <List>
            <InputItem
              placeholder="请输入用户id"
              value={this.state.id}
              labelNumber={5}
              onChange={val => {
                this.setState({ id: val });
              }}
            >
              用户id
            </InputItem>
          </List>
          <List>
            <InputItem
              placeholder="请输入用户姓名"
              labelNumber={5}
              value={this.state.name}
              onChange={val => {
                this.setState({ name: val });
              }}
            >
              姓名
            </InputItem>
          </List>
          <List>
            <InputItem
              placeholder="金钱基数"
              labelNumber={5}
              value={this.state.price}
              onChange={val => {
                this.setState({ price: val });
              }}
            >
              请输入金钱
            </InputItem>
          </List>
          <Button
            type="ghost"
            inline
            size="small"
            style={{
              marginRight: "4px",
              marginTop: "10px",
              marginLeft: "35%",
              transform: "translateX(-35%)"
            }}
            onClick={this.props.Submission.bind(this, id, name, price)}
          >
            提交
          </Button>
          <Button
            type="ghost"
            inline
            size="small"
            style={{ marginRight: "4px", marginTop: "10px" }}
            onClick={() => {
              this.setState({
                ishow: false,
                id: "",
                name: "",
                price: ""
              });
            }}
          >
            取消
          </Button>
        </div>
        <ul className="ClassTwoUls">
          <li />
          {data &&
            data.map((item, index) => {
              return (
                <li key={index}>
                  <span onClick={this.props.modify.bind(this, item.id)}>
                    修改
                  </span>
                  <span> {item.id} </span> <span> {item.name} </span>
                  <span onClick={this.props.deleteDask.bind(this, item.id)}>
                    删除
                  </span>
                </li>
              );
            })}
        </ul>
        <div className="dasks" style={{ display: ishows ? "block" : "none" }}>
          <h3 className="edit"> 编辑用户 </h3>
          <List>
            <InputItem
              clear
              placeholder=" 姓名"
              value={this.state.modifyName}
              ref={el => (this.inputRef = el)}
              onChange={val => {
                this.setState({ modifyName: val });
              }}
            >
              姓名
            </InputItem>
          </List>
          <Button
            type="ghost"
            inline
            size="small"
            style={{
              marginRight: "4px",
              marginTop: "10px",
              marginLeft: "35%",
              transform: "translateX(-35%)"
            }}
            onClick={this.props.modifys.bind(this, modifyName, listID)}
          >
            修改
          </Button>
          <Button
            type="ghost"
            inline
            size="small"
            style={{ marginRight: "4px", marginTop: "10px" }}
            onClick={() => {
              this.setState({ ishows: false, modifyName: "" });
            }}
          >
            取消
          </Button>
        </div>
        <div
          className="warning"
          style={{ display: ishowdask ? "block" : "none" }}
        >
          <h4> 警告 </h4> <p> 确定删除这条数据吗 </p>
          <Button
            type="ghost"
            inline
            size="small"
            style={{
              marginRight: "4px",
              marginTop: "10px",
              marginLeft: "10%",
              transform: "translateX(-35%)"
            }}
            onClick={this.props.delete.bind(this, index)}
          >
            确定
          </Button>
          <Button
            type="ghost"
            inline
            size="small"
            style={{ marginRight: "4px", marginTop: "10px" }}
            onClick={() => {
              this.setState({ ishowdask: null });
            }}
          >
            取消
          </Button>
        </div>
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
    Submission(id, name, price) {
      // 添加数据 把id name price 传到后台添加  重新调用data 总数据 setState 把添加的input 重新设置为空
      axios
        .get(
          `http://localhost:8000/Submission?id=${id}&name=${name}&price=${price}`
        )
        .then(res => {
          // 请求数据库  添加
          // dispatch({ type: "SUBMISSION", data });
          if (res.data.code === 1) {
            this.props.SubmissionAdd();
          }
        });
      this.setState({
        ishow: false,
        id: "",
        name: "",
        price: ""
      });
    },
    SubmissionAdd() {
      axios.get(`http://localhost:8000/SubmissionAdd`).then(res => {
        // 请求数据库   获取全部data数据
        let data = res.data.data;
        let datas = res.data.datas;
        dispatch({ type: "SUBMISSION", data, datas });
      });
    },
    delete(id) {
      // 点击发送 axios  数据id 传过去  删除  如果成功 并且重新调用data 总数据
      axios.get(`http://localhost:8000/delete?id=${id}`).then(res => {
        // 请求数据库   获取全部
        if (res.data.code === 1) {
          this.props.SubmissionAdd();
        }
      });
      this.setState({ ishowdask: null });
    },
    modify(listid) {
      // 弹出修改弹出框  把数据中name 存起来 存到listid里面
      this.setState({ ishows: true, ishow: false });
      this.setState({ listID: listid });
    },
    modifys(name, listID) {
      // 发起axios请求 更改  listID是被更改为的值   name是要更改的值
      axios
        .get(
          `http://localhost:8000/modifys?oldlisid=${listID}&newlistname=${name}`
        )
        .then(res => {
          // 请求数据库   获取全部
          if (res.data.code === 1) {
            this.props.SubmissionAdd();
          }
        });
      this.setState({ ishows: false, modifyID: "", modifyName: "" });
    },
    deleteDask(index) {
      // 点击删除的时候 把弹出框显示 获取 点击的数据里面的id 并且给redux 中ishow设置为true
      dispatch({ type: "DELETEDASK", ishow: true });
      this.setState({ ishowdask: this.props.state.list.ishow });
      this.setState({ index: index });
    }
  };
};
ClassTwo = connect(
  mapState,
  mapDispatch
)(ClassTwo);
export default ClassTwo;
