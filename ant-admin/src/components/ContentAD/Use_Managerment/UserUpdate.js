import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Avatar,
  Select,
  DatePicker,
  Button
} from "antd";
import moment from "moment";
import axios from "axios";

const { Option } = Select;
const dateFormat = "MM/DD/YYYY";

export default class UserUpdate extends Component {
  state = {
    userDetail: {}, 
    

  };

  // _handleSubmit = () => { 
  //   axios.post('', this.state.userDetail) 

  // }

  componentDidMount() {
    axios
      .get(`https://my.api.mockaroo.com/userdetail.json?key=98993900`)
      .then(res => {
        console.log(res.data);
        const userDetail = res.data;
        this.setState({
          userDetail
        });
      });
  }

  render() {
    let { userDetail } = this.state
    console.log(userDetail.gender);
    
    return (
      <div>
        <h3>Basic Setting</h3>
        <Form onSubmit={this._handleSubmit}>
          <Row>
            <Col span={8}>
              <Row>
                <Col span={12} style={{ paddingRight: "30px" }}>
                  <Form.Item>
                    <span>First name</span>
                    {
                      userDetail.first_name &&(
                        <Input
                      value={userDetail.first_name}
                      onChange={this.handleChange}
                    />
                      )
                    }
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>Last name</span>
                    <Input value={userDetail.last_name} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12} style={{ paddingRight: "30px" }}>
                  <Form.Item>
                    <span>Gender</span>
          
                      <Select value={userDetail.gender}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                  
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>Birthday</span>
                    <DatePicker
                      value={moment("2/27/2019", dateFormat)}
                      format={dateFormat}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input value={userDetail.email} />
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input value={userDetail.country} />
              </Form.Item>

              <Form.Item>
                <span>gevme Email</span>
                <Input value={userDetail.gevmeEmail} disabled />
              </Form.Item>

              <Form.Item>
                <span>Prenium</span>
                <Input value={userDetail.prenium ? "Yes" : "No"} disabled />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">Update</Button>
              </Form.Item>
            </Col>
            <Col span={16} style={{ textAlign: "center" }}>
              <Avatar
                size={128}
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
