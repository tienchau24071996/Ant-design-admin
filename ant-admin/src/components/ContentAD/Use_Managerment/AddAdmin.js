import React, { Component } from "react";
import { Form, Input, Row, Col, Button, Select, DatePicker } from "antd";
import { NavLink } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const { Option } = Select;
export default class AddAdmin extends Component {
  state = {
    dataSource: {
      emailError: false,
      dataSource: {
        first_name: "",
        last_name: "",
        Country: "",
        Email: "",
        Company: "",
        GevmeEmail: "nhanle434@gmail.com",
        Gender: "",
        Birthday: null,
        Prenium: "Yes"
      }
    }
  };
  handleAdd = () => {
    let { dataSource } = this.state;
    axios
      .post(`http://5dcb85f734d54a0014315051.mockapi.io/api/admin/`, dataSource)
      .then(res => {});
  };
  handleGetDate = (moment, dateString) => {
    this.setState(prevState => ({
      dataSource: {
        ...prevState.dataSource,
        Birthday: dateString
      }
    }));
  };

  handleSelect = event => {
    this.setState(prevState => ({
      dataSource: {
        ...prevState.dataSource,
        Gender: event
      }
    }));
  };

  handleGetValue = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataSource: {
        ...prevState.dataSource,
        [name]: value
      }
    }));
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataSource: {
        ...prevState.dataSource,
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
    let { emailError } = this.state;
    return (
      <div>
        <h3>Basic Setting</h3>
        <Form>
          <Row>
            <Col xs={24} sm={24} md={6} style={{width:"100%"}}>
              <Form.Item label="First name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.first_name}
                  name="first_name"
                />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.last_name}
                  name="last_name"
                />
              </Form.Item>
              <Form.Item label="Gender">
                <Select
                  onChange={this.handleSelect}
                  value={this.state.dataSource.Gender}
                  name="Gender"
                >
                  <Option value="Female">Female</Option>
                  <Option value="Male">Male</Option>
                </Select>{" "}
              </Form.Item>
              <Form.Item label="Country">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.Country}
                  name="Country"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  onChange={this.handleChangeEmail}
                  value={this.state.dataSource.Email}
                  name="Email"
                />
                {emailError ? (
                  <div style={{ color: "red" }}>Hãy Nhập Mail Hợp Lệ</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Birthday">
                <DatePicker
                  onChange={this.handleGetDate}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Company">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.Company}
                  name="Company"
                />
              </Form.Item>
              <Form.Item label="GevmeEmail">
                <Input
                  disabled
                  onChange={this.handleGetValue}
                  value="nhanle434@gmail.com"
                  name="GevmeEmail"
                />
              </Form.Item>
              <Form.Item label="Prenium">
                <Input
                  onChange={this.handleGetValue}
                  value="Yes"
                  name="Prenium"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{textAlign:"right"}}>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            <NavLink to="/managerment/admin/updatefinish">Add</NavLink>
          </Button>
          </div>
        </Form>
      </div>
    );
  }
}
