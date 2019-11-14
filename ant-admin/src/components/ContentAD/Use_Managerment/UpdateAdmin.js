import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Button } from "antd";
import axios from "axios";
import moment from "moment";

const dateFormat = ["MM/DD/YYYY", "MM/DD/YY"];
const { Option } = Select;

export default class UpdateAdmin extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    axios
      .get(`http://5dcb85f734d54a0014315051.mockapi.io/api/admin/1`)
      .then(res => {
        const user = res.data;
        console.log(user);
        this.setState({
          user
        });
      });
  }

  render() {
    let { user } = this.state;
    console.log(user.Birthday);

    return (
      <div>
        <Form>
          <Row>
            <Col>
              <Row>
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
                      defaultValue={moment('2015/01/01', dateFormat)} 
                      />

                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={user.Email}
                />
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input
                  name="country"
                  onChange={this.handleChange}
                  value={user.Country}
                />
              </Form.Item>

              <Form.Item>
                <span>gevme Email</span>
                <Input disabled value={user.GevmeEmail} />
              </Form.Item>

              <Form.Item>
                <span>Prenium</span>
                <Input disabled value={user.Prenium} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
