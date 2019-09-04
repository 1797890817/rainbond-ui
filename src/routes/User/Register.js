import React, { Component } from "react";
import { connect } from "dva";
import { routerRedux, Link } from "dva/router";
import { Form, Input, Button, Row, Col, Icon, Progress } from "antd";
import styles from "./Register.less";
import config from "../../config/config";

const FormItem = Form.Item;

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@connect(({ user, loading, global }) => ({
  register: user.register,
  rainbondInfo: global.rainbondInfo,
  isRegist: global.isRegist,
  submitting: loading.effects["user/register"]
}))
@Form.create()
export default class Register extends Component {
  // first user, to register admin
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86",
    time: Date.now(),
    firstRegist:
      this.props.rainbondInfo && !this.props.rainbondInfo.is_user_register
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(
      {
        force: true
      },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: "user/register",
            payload: {
              ...values
            },
            complete: () => {
              this.changeTime();
            }
          });
        }
      }
    );
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不匹配!");
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: "请输入密码！",
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({ help: "" });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 8) {
        this.setState({
          help: "密码不能少于8位！",
          visible: !!value
        });
        callback("error");
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({ prefix: value });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  changeTime = () => {
    this.setState({
      time: Date.now()
    });
  };

  handleToLogin = () => {
    const { onChange } = this.props;
    onChange && onChange("login");
  };
  render() {
    if (!this.props.isRegist) {
      this.props.dispatch(routerRedux.replace("/user/login"));
      return null;
    }
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        {/* <h3>{this.state.firstRegist ? "管理员注册" : "用户注册"}</h3> */}
        <Form onSubmit={this.handleSubmit}>
          {this.state.firstRegist && (
            <FormItem>
              {getFieldDecorator("enter_name", {
                rules: [
                  {
                    required: true,
                    message: "请填写企业名称"
                  }
                ]
              })(<Input size="large" placeholder="请填写企业名称" />)}
            </FormItem>
          )}
          <FormItem>
            {getFieldDecorator("user_name", {
              rules: [
                {
                  required: true,
                  message: "请填写用户名！"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                placeholder="请填写用户名"
              />
            )}
          </FormItem>

          <FormItem help={this.state.help}>
            {getFieldDecorator("password", {
              rules: [
                {
                  validator: this.checkPassword
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                placeholder="请填写密码"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password_repeat", {
              rules: [
                {
                  required: true,
                  message: "请确认密码！"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                type="password"
                placeholder="确认密码"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "请填写邮箱地址！"
                },
                {
                  type: "email",
                  message: "邮箱地址格式错误！"
                }
              ]
            })(<Input size="large" placeholder="请填写邮箱" />)}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator("captcha_code", {
                  rules: [
                    {
                      required: true,
                      message: "请填写验证码！"
                    }
                  ]
                })(<Input size="large" placeholder="请填写验证码！" />)}
              </Col>
              <Col span={8}>
                <img
                  onClick={this.changeTime}
                  src={`${config.baseUrl}/console/captcha?_=${this.state.time}`}
                  style={{
                    width: "100%",
                    height: 40,
                    cursor: "pointer"
                  }}
                />
              </Col>
            </Row>
          </FormItem>
          <div className={styles.registbottom}>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              {this.state.firstRegist ? "管理员注册" : "注册"}
            </Button>
            {!this.state.firstRegist && (
              <a
                className={styles.login}
                onClick={() => {
                  this.handleToLogin();
                }}
              >
                使用已有账户登录
              </a>
            )}
          </div>
        </Form>
      </div>
    );
  }
}
