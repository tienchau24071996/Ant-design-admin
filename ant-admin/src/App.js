import React, { Component } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import { Layout, Breadcrumb } from "antd";
import Dashboard from "./components/ContentAD/Dashboard";
import UserTable from "./components/ContentAD/User_Managerment/User/UserTable/UserTableContainer";
import UserUpdate from "./components/ContentAD/User_Managerment/User/UserUpdate/UserUpdateContainer";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import SiderAD from "./components/SiderAD/SiderAD";
import FooterAd from "./components/Footer/FooterAd";
import AdminTable from "./components/ContentAD/User_Managerment/Admin/AdminTable/AdminTableContainer";
import AdminAdd from "./components/ContentAD/User_Managerment/Admin/AdminAdd/AdminAddContainer";
import AdminUpdate from "./components/ContentAD/User_Managerment/Admin/AdminUpdate/AdminUpdateContainer";
import UpdateFinish from "./components/ContentAD/User_Managerment/Admin/UpdateFinish";
const { Content } = Layout;

export default class App extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let { collapsed } = this.state;
    return (
      <Router history={history}>
        <Layout style={{ minHeight: "100vh" }}>
            <SiderAD collapsed={collapsed} />
            <Layout>
              <HeaderMenu toggle={this.toggle} />
              <Content style={{ margin: "0 16px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: "#fff", minHeight: 500 }}>
                  <Switch>
                    <Route exact path="/">
                      <Dashboard />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route exact path="/managerment/user">
                      <UserTable />
                    </Route>
                    <Route path="/managerment/user/update">
                      <UserUpdate />
                    </Route>
                    <Route exact path="/managerment/admin">
                      <AdminTable />
                    </Route>
                    <Route path="/managerment/admin/add">
                      <AdminAdd />
                    </Route>
                    <Route path="/managerment/admin/update">
                      <AdminUpdate />
                    </Route>
                    <Route path="/managerment/admin/updatefinish">
                      <UpdateFinish />
                    </Route>
                    </Switch>
                </div>
              </Content>
              <FooterAd />
            </Layout>
        </Layout>
      </Router>
    );
  }
}
