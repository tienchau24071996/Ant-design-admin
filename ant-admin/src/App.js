import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Dashboard from "./components/ContentAD/Dashboard";
import UserTable from "./components/ContentAD/Use_Managerment/UserTable";
import UserUpdate from "./components/ContentAD/Use_Managerment/UserUpdate";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import SiderAD from "./components/SiderAD/SiderAD";
import FooterAd from "./components/Footer/FooterAd";

const { Content } = Layout;

export default class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    let {collapsed} = this.state
    return (
      <Router>
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
                    <Route exact path="/managerment/user/page=1">
                      <UserTable />
                    </Route>
                    <Route path="/managerment/user/update">
                      <UserUpdate />
                    </Route>
                    <Route path="/managerment/admin">
                      <div>admin</div>
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
