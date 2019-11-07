import React, { Component } from "react";
import { Table, Divider,Button,Popconfirm } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Fist Name",
    dataIndex: "first_name",
    key: "FistName",
  },
  {
    title: "LastName",
    dataIndex: "last_name",
    key: "LastName"
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "address"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "Gender"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

export default class UserAdmin extends Component {
  state = {
    user: []
  };
  componentDidMount() {
    axios
      .get(`https://my.api.mockaroo.com/useradmin.json?key=3615c370`)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
      .then(() => {
        this.formatData();
      });
  }
  formatData () {
    let { user } = this.state;
    let newData = [];
    newData = user.map(item => ({
    }));
    console.log(newData);
    this.setState({
      newData: newData
    });

  }


  render() {
    console.log(this.state.user);
    let {user} = this.state

    return (
      <div>
                  <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table columns={columns} dataSource={user} rowKey="id" />
      </div>
    );
  }
}
