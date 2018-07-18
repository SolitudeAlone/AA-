import React, { Component } from "react";
import { connect } from "react-redux";
class Settlement extends Component {
  render() {
    let { settleDATA } = this.props.state.list;
    return (
      <section>
        <div className="TotalPrices">{this.props.state.list.asyncsum}</div>
        <table>
          <tbody className="tacodys">
            <tr>
              <td>姓名</td>
              <td>个人总计</td>
              <td>平均金额</td>
              <td>应付</td>
              <td>应收</td>
            </tr>
            {settleDATA &&
              settleDATA.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.Average}</td>
                    <td>{item.copeWith}</td>
                    <td>{item.receivable}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    );
  }
  componentDidMount() {
    this.props.settle();
  }
}
let mapState = state => {
  return {
    state
  };
};
let mapDispatch = dispatch => {
  return {
    settle() {
      dispatch({ type: "SETTLE" });
    }
  };
};
Settlement = connect(
  mapState,
  mapDispatch
)(Settlement);
export default Settlement;
