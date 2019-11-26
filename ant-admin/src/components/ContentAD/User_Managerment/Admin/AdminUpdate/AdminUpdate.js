import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Button, Icon } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import validator from "validator";

const dateFormat = ["MM/DD/YYYY", "MM/DD/YY"];
const { Option } = Select;
const ButtonGroup = Button.Group;

export default class UpdateAdmin extends Component {
  state = {
    adminUpdate: {},
    emailError: false,
    TestBirthday: false
  };

  componentDidMount() {
    this.handleAdmin();
  }

  handleAdmin = () => {
    this.props.onGetAdmin(data => {
      this.setState({
        adminUpdate: data
      });
    });
  };

  handleChangeDate = (moment, dateString) => {
    let datenow = new Date();
    let yearnow = datenow.getFullYear();
    let monthnow = datenow.getUTCMonth() + 1;
    let daynow = ("0" + datenow.getDate()).slice(-2);
    let datenew = moment._d;
    let yearnew = datenew.getFullYear();
    let monthnew = datenew.getUTCMonth() + 1;
    let daynew = ("0" + datenew.getDate()).slice(-2);
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        birthday: dateString
      }
    }));
    if (yearnew > yearnow) {
      this.setState({ TestBirthday: true });
    } else if (yearnew < yearnow) {
      this.setState({ TestBirthday: false });
    } else if ((yearnew = yearnow)) {
      if (monthnew < monthnow) {
        this.setState({ TestBirthday: false });
      } else if (monthnew > monthnow) {
        this.setState({ TestBirthday: true });
      } else if ((monthnew = monthnow)) {
        if (daynew >= daynow) {
          this.setState({ TestBirthday: true });
        } else if (datenew < datenow) {
          this.setState({ TestBirthday: false });
        }
      }
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        [name]: value
      }
    }));
  };

  handleChangeSelect = event => {
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        gender: event
      }
    }));
  };

  handleErrorEmail = value => {
    this.setState({
      emailError: !validator.isEmail(value)
    });
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        [name]: value
      }
    }));
    this.handleErrorEmail(event.target.value);
  };

  handleClick = () => {
    this.props.onUpdateAdmin(this.state.adminUpdate);
  };

  render() {
    let { emailError, TestBirthday, adminUpdate } = this.state;
    return (
      <div>
        <ButtonGroup style={{ marginBottom: 16 }}>
          <NavLink to="/managerment/admin">
            <Button type="primary">
              <Icon type="left" />
              <span style={{ fontSize: "16px" }}>Back</span>
            </Button>
          </NavLink>
        </ButtonGroup>
        <Form>
          <Row style={{ height: "100%" }}>
            <Col xs={24} sm={24} md={6} style={{ width: "100%" }}>
              <Row style={{ height: "100%" }}>
                <Col>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <span>First name</span>
                    <Input
                      name="first_name"
                      onChange={this.handleChange}
                      value={adminUpdate.first_name}
                    />
                    {!this.props.isLoading &&
                    !this.state.adminUpdate.first_name ? (
                      <div style={{ height: "30px", color:"red" }}>Can't empty</div>
                    ) : (
                      <div style={{ height: "30px" }}></div>
                    )}
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <span>Last name</span>
                    <Input
                      name="last_name"
                      onChange={this.handleChange}
                      value={adminUpdate.last_name}
                    />
                    {!this.props.isLoading &&
                    !this.state.adminUpdate.last_name ? (
                      <div style={{ height: "30px", color:"red" }}>Can't empty</div>
                    ) : (
                      <div style={{ height: "30px" }}></div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item>
                    <span>Gender</span>
                    <Select
                      name="gender"
                      onChange={this.handleChangeSelect}
                      value={adminUpdate.gender}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Custom">Custom</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <span>Birthday</span>
                    <DatePicker
                      name="date"
                      format={dateFormat}
                      onChange={this.handleChangeDate}
                      style={{ width: "100%" }}
                      value={
                        adminUpdate.birthday
                          ? moment(adminUpdate.birthday, dateFormat)
                          : null
                      }
                    />
                    {TestBirthday ? (
                      <div style={{ color: "red" }}>
                        Invalid birthday, please enter again
                      </div>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input
                  name="email"
                  onChange={this.handleChangeEmail}
                  value={adminUpdate.email}
                />
                {emailError ? (
                  <div style={{ color: "red" }}>
                    Invalid email, please enter again
                  </div>
                ) : null}
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input
                  name="country"
                  onChange={this.handleChange}
                  value={adminUpdate.country}
                />
                {!this.props.isLoading && !this.state.adminUpdate.country ? (
                  <div style={{ height: "30px", color:"red" }}>Can't empty</div>
                ) : (
                  <div style={{ height: "30px" }}></div>
                )}
              </Form.Item>

              <Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleClick}
                  >
                    <NavLink to="/managerment/admin/updatefinish">
                      Update
                    </NavLink>
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
