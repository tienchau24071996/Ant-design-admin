import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Icon
} from "antd";
import { NavLink } from "react-router-dom";
import validator from "validator";

const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const { Option } = Select;

const ButtonGroup = Button.Group;

export default class AddAdmin extends Component {
  state = {
    dataAdmin: {
      first_name: "",
      last_name: "",
      country: "",
      email: "",
      company: "",
      gender: "",
      birthday: null,
    },
    ischeckBirthday: false,
    emailError: false,
    first_nameError: false,
    last_nameError: false,
    genderError: false,
    countryError: false,
    companyError: false
  };

  handleAdd = () => {
    this.props.onUpAdmin(this.state.dataAdmin);
  };

  handleGetDate = (moment, dateString) => {
    let datenow = new Date();
    let yearnow = datenow.getFullYear();
    let monthnow = datenow.getUTCMonth() + 1;
    let daynow = ("0" + datenow.getDate()).slice(-2);
    let datenew = moment._d;
    let yearnew = datenew.getFullYear();
    let monthnew = datenew.getUTCMonth() + 1;
    let daynew = ("0" + datenew.getDate()).slice(-2);
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        birthday: dateString
      }
    }));
    if (yearnew > yearnow) {
      this.setState({ ischeckBirthday: true });
    } else if (yearnew < yearnow) {
      this.setState({ ischeckBirthday: false });
    } else if ((yearnew = yearnow)) {
      if (monthnew < monthnow) {
        this.setState({ ischeckBirthday: false });
      } else if (monthnew > monthnow) {
        this.setState({ ischeckBirthday: true });
      } else if ((monthnew = monthnow)) {
        if (daynew >= daynow) {
          this.setState({ ischeckBirthday: true });
        } else if (datenew < datenow) {
          this.setState({ ischeckBirthday: false });
        }
      }
    }
  };

  handleSelect = event => {
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        gender: event
      }
    }));
  };

  handleGetValue = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        [name]: value
      }
    }));
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        [name]: value
      }
    }));
    this.handleErrorEmail(event.target.value);
  };

  handleErrorEmail = value => {
    this.setState({
      emailError: !validator.isEmail(value)
    });
  };

 

  render() {
    let { emailError, ischeckBirthday, dataAdmin } = this.state;   
    const disabled = (!ischeckBirthday &&
      !emailError &&
      dataAdmin.first_name &&
      dataAdmin.last_name &&
      dataAdmin.country &&
      dataAdmin.email &&
      dataAdmin.birthday &&
      dataAdmin.company) ? false : true
      
    return (
      <div>
        <ButtonGroup style={{ marginBottom: 16 }}>
          <NavLink to="/managerment/admin">
            <Button type="primary" style={{ borderRadius: "6px" }}>
              <Icon type="left" />
              <span style={{ fontSize: "16px" }}>Back</span>
            </Button>
          </NavLink>
        </ButtonGroup>

        <Form>
          <Row>
            <Col xs={24} sm={24} md={6} style={{ width: "100%" }}>
              <Form.Item label="First name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.first_name}
                  name="first_name"
                />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.last_name}
                  name="last_name"
                />
              </Form.Item>
              <Form.Item label="Gender">
                <Select
                  onChange={this.handleSelect}
                  value={this.state.dataAdmin.gender}
                  name="gender"
                >
                  <Option value="Female">Female</Option>
                  <Option value="Male">Male</Option>
                  <Option value="Other">Other</Option>
                </Select>{" "}
              </Form.Item>
              <Form.Item label="Country">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.country}
                  name="country"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  onChange={this.handleChangeEmail}
                  value={this.state.dataAdmin.email}
                  name="email"
                />
                {emailError ? (
                  <div style={{ color: "red" }}>
                    Invalid email, please enter again
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="Birthday">
                <DatePicker
                  onChange={this.handleGetDate}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                />
                {ischeckBirthday ? (
                  <div style={{ color: "red" }}>
                    Invalid birthday, please enter again
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="Company">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.company}
                  name="company"
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
              <Button
                onClick={this.handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
                disabled={disabled}
              >
                <NavLink to="/managerment/admin/updatefinish">Add</NavLink>
              </Button>
            
          </div>
        </Form>
      </div>
    );
  }
}
