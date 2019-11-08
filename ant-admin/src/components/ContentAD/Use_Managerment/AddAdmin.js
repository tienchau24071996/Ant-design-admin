import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  AutoComplete,
  Button,
  Select,
  DatePicker
} from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import validator from 'validator';


const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const InputGroup = Input.Group;
const { Option } = Select;
export default class AddAdmin extends Component {
  state = {
    dataSource: [],
    EmailError : false
  };
  handleAdd = () => {
    axios({
      method: "post",
      url: "https://my.api.mockaroo.com/newadmin.json?key=3615c370",
      data: {}
    });
  };
  handleErrorEmail = () => (event) => {
    let {EmailError} = this.state
    const email = event;
    if (!validator.isEmail(email)) {
      this.setState({EmailError : false})
    }   
    this.setState({EmailError : true}) 
    console.log(email)
  }
  render() {
    let {EmailError} = this.state
    return (
      <div>
        <h3>Basic Setting</h3>
        <Form>
          <Row>
            <Col span={8}>
              <Form.Item label="Fist Name">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input />
              </Form.Item>
              <Form.Item label="Gender">
                <Select defaultValue="Gender">
                  <Option value="Female">Female</Option>
                  <Option value="Male">Male</Option>
                </Select>{" "}
              </Form.Item>
              <Form.Item label="Country">
                <Input />
              </Form.Item>
              <Form.Item label="Email">
                <InputGroup compact>
                  <AutoComplete
                    onChange={this.handleErrorEmail()}
                    name="email"
                    id="email"
                    dataSource={this.state.dataSource}
                    style={{ width: "100%" }}
                  />
                  {EmailError ?(
                    <div>Hay nhap email hop le</div>
                  ): null}
                </InputGroup>
              </Form.Item>
              <Form.Item label="Birthday">
                <DatePicker
                  defaultValue={moment("10/29/1998", dateFormatList[0])}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Company">
                <Input />
              </Form.Item>
              <Form.Item label="GevmeEmail">
                <InputGroup compact>
                  <AutoComplete
                    dataSource={this.state.dataSource}
                    style={{ width: "100%" }}

                    // onChange={this.ErrorEmail()}
                  />
                </InputGroup>
              </Form.Item>
              <Form.Item label="Prenium">
                <Select defaultValue="true">
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>{" "}
              </Form.Item>
            </Col>
          </Row>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            <NavLink to="">Add</NavLink>
          </Button>
        </Form>
      </div>
    );
  }
}
