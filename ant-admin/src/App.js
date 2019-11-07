import React, { Component } from "react";
import "./App.css";
// import Home from './view/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Dashboard from "./components/ContentAD/Dashboard";
import UserTable from "./components/ContentAD/Use_Managerment/UserTable";
import UserProfile from "./components/ContentAD/UserProfile";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import SiderAD from "./components/SiderAD/SiderAD";
import FooterAd from "./components/Footer/FooterAd";
import UserAdmin from "./components/ContentAD/Use_Managerment/UserAdmin"

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
                    <Route path="/Dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/Table-User">
                      <UserTable />
                    </Route>
                    <Route path="/Table-Admin">
                      <UserAdmin/>
                    </Route>
                    <Route path="/User">
                      <UserProfile />
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
