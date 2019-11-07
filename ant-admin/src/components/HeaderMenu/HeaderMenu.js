import React, { Component } from "react";
import { Layout, Avatar, Dropdown, Menu, Icon, Row, Col } from "antd";
import "./HeaderMenu.css";

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.zing.vn/">
        Account Center
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.zing.vn/">
        Account Setting
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.zing.vn/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default class HeaderMenu extends Component {
  render() {
    let { toggle } = this.props;
    return (
      <Header className="header">
        <Row>
          <Col span={12}>
            <Icon
              className="trigger"
              style={{
                color: "black",
                fontSize: "22px"
              }}
              type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={toggle}
            />
          </Col>
          <Col span={12}>
            <div className="header-right">
              <Dropdown overlay={menu}>
                <Avatar
                  size="large"
                  icon="user"
                  style={{ cursor: "pointer" }}
                  className="ant-dropdown-link"
                />
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    );
  }
}
