import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import "./SiderAD.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderAD extends Component {
  state = {
    temp: "1"
  };
  componentDidMount() {
    const url_string = window.location.href;
    const url = new URL(url_string).pathname;
    if (url === "/managerment/admin" || url === "/managerment/admin/update") {
      this.setState({ temp: "3" });
    }
  }
  handleClickAdmin = () => {
    this.setState({ temp: "3" });
  }
  handleClickDashDoard = () => {
    this.setState({ temp: "1" });
  }
  render() {
    let { temp } = this.state;
    let { collapsed } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={collapsed} className="Sider">
        <div className="logo">
          <Avatar
            size={64}
            src="https://media.licdn.com/dms/image/C510BAQGEoHkIdPtXow/company-logo_400_400/0?e=1580947200&v=beta&t=8ujYl6meTinWVsT02DdvKaYS4QBd5dImav5yEsGfb2Y"
          />
          <h2 style={{ color: "#fff", marginBottom: 0, paddingLeft: "10px" }}>
            Spirit Labs
          </h2>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[temp]}>
          <Menu.Item key="1">
            <NavLink
              to="/dashboard"
              onClick={this.handleClickDashDoard}
            >
              <Icon type="pie-chart" />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>User Managerment</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <NavLink to="/managerment/user">User</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink
                to="/managerment/admin?page=1"
                onClick={this.handleClickAdmin}
              >
                Admin
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
