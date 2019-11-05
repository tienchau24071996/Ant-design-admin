import React, { Component } from "react";
import "./App.css";
// import Home from './view/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Dashboard from "./components/ContentAD/Dashboard";
import TableAD from "./components/ContentAD/TableAD";
import User from "./components/ContentAD/User";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import SiderAD from "./components/SiderAD/SiderAD";
import FooterAd from "./components/Footer/FooterAd";

const { Content } = Layout;

export default class App extends Component {

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
            <SiderAD />
            <Layout>
              <HeaderMenu />
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
                    <Route path="/Table">
                      <TableAD />
                    </Route>
                    <Route path="/User">
                      <User />
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
