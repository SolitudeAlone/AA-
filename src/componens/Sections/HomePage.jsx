import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel, WingBlank } from "antd-mobile";
import { connect } from "react-redux";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paw: ""
    };
  }
  render() {
    
    let { data } = this.props.state.list;
    let { paw } = this.state;
    return (
      <section>
        <div className="TotalPrice">{this.props.state.list.asyncsum}</div>
        <h2 className="tit"> 嗨 666 亲爱的朋友们 </h2>
        {paw === "123" ? (
          <Link to="/two" className="twoBut">
            <button> 管理用户 </button>
          </Link>
        ) : (
          <button className="but">
            <input
              type="password"
              placeholder="请输入管理员密码"
              onChange={ev => {
                this.setState({ paw: ev.target.value });
              }}
            />
          </button>
        )}
        <WingBlank>
          <Carousel
            className="my-carousel"
            dots={false}
            dragging={false}
            swiping={false}
            vertical={false}
            autoplay
            infinite
            autoplayInterval={2000}
          >
            <div className="v-item"> carousel 1 </div>
            <div className="v-item"> carousel 2 </div>
            <div className="v-item"> carousel 3 </div>
          </Carousel>
        </WingBlank>
        <div className="HomePageDiv">
          <ul className="HomePageUls">
            {data &&
              data.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={"/one/details/" + item.name}>
                      <span> {item.name} </span> <span> {item.price} </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    );
  }
  componentDidMount() {}
}
let mapState = state => {
  return {
    state
  };
};
let mapDispatch = dispatch => {
  return {};
};
HomePage = connect(
  mapState,
  mapDispatch
)(HomePage);

export default HomePage;
