import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage:''
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    console.log(event.target.value);
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };
  handleLogin = async () => {
    this.setState({
      errMessage:''
    })
    try {
      let data = await handleLoginApi(this.state.username,this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage:data.message
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Đăng nhập thành công");
      }
    } catch(error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage:error.response.data.message
          });
        }
      }
      console.log('Lỗi khi thực hiện đăng nhập:', error);
    }
  };
  handledShowhidepassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-login">Login</div>
            <div className="form-login">
              <div className="col-12 form-group login-input">
                <label>User Name</label>
                <input
                  value={this.state.username}
                  onChange={(event) => this.handleOnchangeUsername(event)}
                  type="text"
                  className="form-control col-12"
                ></input>
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    value={this.state.password}
                    onChange={(event) => this.handleOnchangePassword(event)}
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control col-12"
                  ></input>
                  <span
                    onClick={() => {
                      this.handledShowhidepassword();
                    }}
                  >
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash "
                      }
                    >
                      {" "}
                    </i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12" style={{color:"red"}}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password"> Forgot Your Password ?</span>
            </div>
            <div className="col-12 text-center">
              <span className=" text text-other-login ">Or Login with</span>
            </div>
            <div className="col-5 social-login">
              <i className="fab fa-google google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
   
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess:(userInfor)=>dispatch(actions.userLoginSuccess(userInfor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
