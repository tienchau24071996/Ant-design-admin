import React, { Component } from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import "./HeaderMenu.css";

const { Header } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.zing.vn/"
      >
        Account Center
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.zing.vn/"
      >
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
    return (
      <Header className="header">
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
      </Header>
    );
  }
}
