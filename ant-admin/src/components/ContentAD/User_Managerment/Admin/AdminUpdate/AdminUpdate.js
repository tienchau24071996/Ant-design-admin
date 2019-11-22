import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Button, Alert,Icon } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import validator from "validator";

const dateFormat = ["MM/DD/YYYY", "MM/DD/YY"];
const { Option } = Select;
const ButtonGroup = Button.Group;

export default class UpdateAdmin extends Component {
  state = {
    user: {
      dataSource: {
        first_name: "",
        last_name: "",
        Country: "",
        Email: "",
        Company: "",
        gevmeEmail: "nhanle434@gmail.com",
        Gender: "",
        Birthday: null,
        prenium: "Yes"
      }
    },
    emailError: false,
    TestBirthday: true
  };

  componentDidMount() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get("id");
    axios
      .get(`http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${id}`)
      .then(res => {
        const user = res.data;
        this.setState({
          user
        });
      });
  }

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
      user: {
        ...prevState.user,
        Birthday: dateString
      }
    }));
    if (yearnew > yearnow) {
      this.setState({ TestBirthday: false });
    } else if (yearnew < yearnow) {
      this.setState({ TestBirthday: false });
    } else if ((yearnew = yearnow)) {
      if (monthnew < monthnow) {
        this.setState({ TestBirthday: true });
      } else if (monthnew > monthnow) {
        this.setState({ TestBirthday: false });
      } else if ((monthnew = monthnow)) {
        if (daynew >= daynow) {
          this.setState({ TestBirthday: false });
        } else if (datenew < datenow) {
          this.setState({ TestBirthday: true });
        }
      }
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };
  handleChangeSelect = event => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        Gender: event
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
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
    this.handleErrorEmail(event.target.value);
  };
  handleClick = () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get("id");
    let { user } = this.state;
    axios
      .put(`http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${id}`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
  render() {
    let { user, emailError, TestBirthday } = this.state;
    return (
      <div>
        <ButtonGroup style={{ marginBottom: 16 }}>
          <NavLink to="/managerment/admin">
            <Button type="primary">
              <Icon type="left" />
              <span style={{fontSize:"16px"}}>Back</span>
            </Button>
          </NavLink>
        </ButtonGroup>
        <Form>
          <Row style={{ height: "100%" }}>
            <Col xs={24} sm={24} md={6} style={{ width: "100%" }}>
              <Row style={{ height: "100%" }}>
                <Col>
                  <Form.Item>
                    <span>First name</span>
                    <Input
                      name="first_name"
                      onChange={this.handleChange}
                      value={user.first_name}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <span>Last name</span>
                    <Input
                      name="last_name"
                      onChange={this.handleChange}
                      value={user.last_name}
                    />
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
                      value={user.Gender}
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
                        user.Birthday ? moment(user.Birthday, dateFormat) : null
                      }
                    />
                    {!TestBirthday ? (
                      <Alert
                        message="Date of birth must be before the current date, please enter again"
                        type="error"
                      />
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input
                  name="Email"
                  onChange={this.handleChangeEmail}
                  value={user.Email}
                />
                {emailError ? (
                  <Alert
                    message="Invalid message, please enter again"
                    type="error"
                  />
                ) : null}
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input
                  name="Country"
                  onChange={this.handleChange}
                  value={user.Country}
                />
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
