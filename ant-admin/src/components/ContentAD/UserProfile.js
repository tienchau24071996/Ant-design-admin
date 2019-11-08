import React, { Component } from "react";
import { Form, Input, Row, Col, Avatar } from "antd";

export default class UserProfile extends Component {
    
  render() {
    return (
      <div>
        <h3>Basic Setting</h3>
        <Form >
          <Row>
            <Col span={8}>
              <Form.Item label="E-mail">
                <Input  />
              </Form.Item>
              <Form.Item label="password">
                <Input />
              </Form.Item>
              <Form.Item label="Fist Name">
                <Input  />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input  />
              </Form.Item>
              <Form.Item label="Gender">
                <Input  />
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
