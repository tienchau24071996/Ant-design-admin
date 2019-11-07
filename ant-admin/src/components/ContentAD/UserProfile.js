import React, { Component } from "react";
import { Form, Input, Row, Col, Avatar } from "antd";
import axios from 'axios'

export default class UserProfile extends Component {
    state = {
        user: []
      }

     componentDidMount() {
        axios.get(`https://my.api.mockaroo.com/users.json?key=2460bd50`)
        .then(res => {
          const user = res.data;
          this.setState({ user });
        })
     }

  render() {
    let {user} = this.state
    console.log(user.email);
    
    return (
      <div>
        <h3>Basic Setting</h3>
        <Form >
          <Row>
            <Col span={8}>
              <Form.Item label="E-mail">
                <Input value={user.email} />
              </Form.Item>
              <Form.Item label="password">
                <Input />
              </Form.Item>
              <Form.Item label="Fist Name">
                <Input value={user.first_name} />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input value={user.last_name} />
              </Form.Item>
              <Form.Item label="Gender">
                <Input value={user.gender} />
              </Form.Item>
              <Form.Item label="Birthday">
                <Input />
              </Form.Item>
              <Form.Item label="Country">
                <Input />
              </Form.Item>
              <Form.Item label="Company Name">
                <Input />
              </Form.Item>
              <Form.Item label="Job Level">
                <Input />
              </Form.Item>
            </Col>
            <Col span={16} style={{textAlign:"center"}} >
                <Avatar size={128} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />    
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
