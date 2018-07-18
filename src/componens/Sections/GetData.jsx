import React from "react";
import { Button, DatePicker, InputItem, List, Picker } from "antd-mobile";
import { connect } from "react-redux";
import axios from "axios";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    maxDate.getDate()
  );
}

class Demo extends React.Component {
  state = {
    date: now,
    time: now,
    utcDate: utcNow,
    dpValue: null,
    customChildValue: null,
    visible: false,
    data: [
      {
        label: "2013",
        value: "2013"
      },
      {
        label: "2014",
        value: "2014"
      }
    ],
    cols: 1,
    money: "",
    asyncValue: [], //姓名
    Remarks: "",
    EmptyIshow: false
  };
  handleClick = () => {
    this.inputRef.focus();
  };
  render() {
    let { money, asyncValue, Remarks, date, EmptyIshow } = this.state;

    return (
      <div>
        <List className="date-picker-list" style={{ backgroundColor: "white" }}>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="Optional"
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal"> Date </List.Item>
          </DatePicker>
        </List>
        <List style={{ backgroundColor: "white" }} className="picker-list">
          <Picker
            data={this.state.data}
            cols={this.state.cols}
            value={this.state.asyncValue}
            onOk={v => this.setState({ asyncValue: v })}
          >
            <List.Item arrow="horizontal" onClick={this.onClick}>
              请选择姓名
            </List.Item>
          </Picker>
        </List>
        <List>
          <InputItem
            placeholder="请输入金额"
            labelNumber={5}
            value={this.state.money}
            onChange={e => {
              this.setState({ money: e });
            }}
          >
            金额
          </InputItem>
        </List>
        <List>
          <InputItem
            placeholder="请输入备注"
            labelNumber={5}
            value={this.state.Remarks}
            onChange={e => {
              this.setState({ Remarks: e });
            }}
          >
            备注
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
          onClick={this.props.submis.bind(
            this,
            money,
            asyncValue[0],
            Remarks,
            date.toLocaleDateString()
          )}
        >
          提交
        </Button>
        <Button
          type="ghost"
          inline
          size="small"
          style={{ marginRight: "4px", marginTop: "10px" }}
          onClick={() => {
            this.setState({ EmptyIshow: true });
          }}
        >
          清空
        </Button>
        <div
          className="warning"
          style={{ display: EmptyIshow ? "block" : "none" }}
        >
          <h4> 警告 </h4> <p> 确定清空吗 </p>
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
            onClick={() => {
              this.setState({ Remarks: "" });
              this.setState({ asyncValue: [] });
              this.setState({ money: "" });
              this.setState({ EmptyIshow: false });
            }}
          >
            确定
          </Button>
          <Button
            type="ghost"
            inline
            size="small"
            style={{ marginRight: "4px", marginTop: "10px" }}
            onClick={() => {
              this.setState({ EmptyIshow: false });
            }}
          >
            取消
          </Button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let data = this.props.state.list.data;
    let datas = [];
    data &&
      data.map((item) => {
        datas.push({
          label: item.name,
          value: item.name
        });
      });
    this.setState({ data: datas });
  }
}
let mapState = state => {
  return {
    state
  };
};
let mapDispatch = dispatch => {
  return {
    submis(money, asyncValue, Remarks, date) {
      let dataSet = {
        money: money,
        asyncValue: asyncValue,
        Remarks: Remarks,
        date: date
      };
      axios
        .get(
          `http://localhost:8000/GetData?money=${money}&asyncValue=${asyncValue}&Remarks=${Remarks}&date=${date}`
        )
        .then(res => {
          dispatch({ type: "SUBMIS", notde: res.data.data });
          dispatch({ type: "SUBMIS", dataSet });
        });

      this.setState({ Remarks: "" });
      this.setState({ asyncValue: [] });
      this.setState({ money: "" });
    }
  };
};
Demo = connect(
  mapState,
  mapDispatch
)(Demo);
export default Demo;
