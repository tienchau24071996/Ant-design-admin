import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import "./SiderAD.css";

const { Sider } = Layout;

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
              <NavLink to="/Dashboard" >
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/Table" >
              <Icon type="desktop" />
              <span>User Managerment</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="3">
            <NavLink to="/User" >
              <Icon type="user" />
              <span>Edit User</span>
            </NavLink>
          </Menu.Item>
          
        </Menu>
      </Sider>
    );
  }
}
