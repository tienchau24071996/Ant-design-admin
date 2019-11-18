import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import "./SiderAD.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderAD extends Component {
 
  render() {
    let {collapsed} = this.props
    return (
      <Sider
        trigger={null} collapsible 
        collapsed={collapsed}
        className="Sider"
      >
          
            <div className="logo">
              <Avatar size={64} src="https://media.licdn.com/dms/image/C510BAQGEoHkIdPtXow/company-logo_400_400/0?e=1580947200&v=beta&t=8ujYl6meTinWVsT02DdvKaYS4QBd5dImav5yEsGfb2Y" />    
              <h2 style={{color:"#fff",marginBottom:0,paddingLeft: "10px"}}>Spirit Labs</h2>
            </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} >
          <Menu.Item key="1">
              <NavLink to="/dashboard" >
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </NavLink>
          </Menu.Item>

          <SubMenu key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>User Managerment</span>
              </span>
          }>
            <Menu.Item key="2">
              <NavLink to="/managerment/user" >
                User
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/managerment/admin?page=1" >
                Admin
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4">
            <NavLink to="/User" >
              <Icon type="user" />
              <span>User Profile</span>
            </NavLink>
          </Menu.Item>
          
        </Menu>
      </Sider>
    );
  }
}
