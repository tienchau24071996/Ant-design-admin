import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Result, Button } from "antd";

export default class UpdateFinish extends Component {
  render() {
    return (
      <div>
        <Result
          status="success"
          title="Finish"
          extra={[
            <Button type="primary" key="console">
              <NavLink to="/managerment/admin">Go Console</NavLink>
            </Button>
          ]}
        />
      </div>
    );
  }
}
