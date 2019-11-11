import React, { Component } from "react";
import { Form, Input, Row, Col, Button, Select, DatePicker } from "antd";
import { NavLink } from "react-router-dom";
import validator from "validator";

const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const { Option } = Select;
export default class AddAdmin extends Component {
  state = {
    emailError: false,
    dataSource: {
    first_name: "",
    last_name: "",
    country: "",
    email: "",
    company: "",
    gevmeEmail: "nhanle434@gmail.com",
    gender: "",
    date: null,
    prenium:"Yes"
    },
    
  };
  handleAdd = () => {
    console.log(this.state.dataSource);


  };
  handleGetDate = (moment, dateString) => {
    this.setState( prevState => ({
      dataSource:{
        ...prevState.dataSource,
      date: dateString
      }
    }));
  };

  handleSelect = event => {
    this.setState( prevState =>({
      dataSource:{
        ...prevState.dataSource,
      gender: event
      }
    }));
  };

  handleGetValue = event => {
    const { name, value } = event.target
    this.setState( prevState => ({
      dataSource : {
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
            <Col span={8}>
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
                  value={this.state.dataSource.gender}
                  name="gender"
                >
                  <Option value="Female">Female</Option>
                  <Option value="Male">Male</Option>
                </Select>{" "}
              </Form.Item>
              <Form.Item label="Country">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.country}
                  name="country"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataSource.email}
                  name="email"
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
                  value={this.state.dataSource.company}
                  name="company"
                />
              </Form.Item>
              <Form.Item label="GevmeEmail">
                <Input
                  disabled
                  onChange={this.handleGetValue}
                  value="nhanle434@gmail.com"
                  name="gevmeEmail"
                />
              </Form.Item>
              <Form.Item label="Prenium">
                <Input
                 onChange={this.handleGetValue}
                value="Yes"
                name="prenium"
                disabled 
                />
                
              </Form.Item>
            </Col>
          </Row>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            <NavLink to="/managerment/admin">Add</NavLink>
          </Button>
        </Form>
      </div>
    );
  }
}
