import React, { Component } from "react";

import { Table, Divider } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";


const columns = [
  {
    title: "ID",
    width: 100,
    dataIndex: "id",
    key: "id",
    fixed: "left"
  },
  {
    title: "First name",
    width: 100,
    dataIndex: "firstName",
    key: "firstName",
    fixed: "left"
  },
  {
    title: "Last name",
    width: 100,
    dataIndex: "lastName",
    key: "lastName",
    fixed: "left"
  },
  {
    title: "Gender",
    width: 100,
    dataIndex: "gender",
    key: "gender"
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
    key: "operation",
    fixed: "right",
    width: 120,
    render: (text, record) => {
      console.log(record);
      return (
        <span>
          <NavLink to={`/managerment/user/update?id=${record.id}`}>
            Edit
          </NavLink>
          <Divider type="vertical" />
          <a href="/">Delete</a>
        </span>
      );
    }
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
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
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
        <Table columns={columns} dataSource={newData} scroll={{ x: 1500 }}></Table>
      </div>
    );
  }
}
