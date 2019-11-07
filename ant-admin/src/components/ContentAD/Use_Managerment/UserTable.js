import React, { Component } from "react";

import { Table, Divider } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Firstname",
    width: 100,
    dataIndex: "firstName",
    key: "firstName",
    fixed: 'left'
  },
  {
    title: "Gender",
    width: 100,
    dataIndex: "gender",
    key: "gender",
    fixed: 'left'
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 250
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "birthday"
  },
  {
    title: "Company",
    dataIndex: "companyName",
    key: "companyName"
  },
  {
    title: "GevmeEmail",
    dataIndex: "gevmeEmail",
    key: "gevmeEmail",
    width: 250
  },
  {
    title: "Prenium",
    dataIndex: "isPrenium",
    key: "isPrenium"
  },
  {
    title: "Action",
    key: 'operation',
    fixed: 'right',
    width: 120,
    render: (text, record) => (
      <span>
        <a href="/">Edit</a>
        <Divider type="vertical" />
        <a href="/">Delete</a>
      </span>
    )
  }
];

export default class UserTable extends Component {
  state = {
    user: [],
    newData: []
  };

  componentDidMount() {
    axios
      .get(`https://my.api.mockaroo.com/userclient.json?key=c95ad840`)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
      .then(() => {
        this.formatData();
      });
  }

  formatData = () => {
    let { user } = this.state;
    console.log(user);
    let newData = [];
    newData = user.map(item => ({
      key: item.id,
      firstName: item.first_name,
      gender: item.gender,
      country: item.country,
      email: item.email,
      birthday: item.birthday,
      companyName: item.companyName,
      gevmeEmail: item.gevmeEmail,
      isPrenium: item.isPrenium ? "Yes" : "No"
    }));
    console.log(newData);
    this.setState({
      newData: newData
    });
  };

  render() {
    let { newData } = this.state;
    return (
      <div>
        <Table columns={columns} dataSource={newData} scroll={{ x: 1300 }}/>
      </div>
    );
  }
}
