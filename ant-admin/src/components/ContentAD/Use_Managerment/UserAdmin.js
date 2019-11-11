import React, { Component } from "react";
import { Table, Divider, Button } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";

const columns = [
  {
    title: "Fist Name",
    dataIndex: "first_name",
    key: "FistName"
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "LastName"
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender"
  },
  {
    title: "Country",
    dataIndex: "Country",
    key: "Country"
  },
  {
    title: "Email Address",
    dataIndex: "Email",
    key: "Email"
  },
  {
    title: "Birthday",
    dataIndex: "Birthday",
    key: "Birthday"
  },
  {
    title: "Company",
    dataIndex: "Company",
    key: "Company"
  },
  {
    title: "GevmeEmail",
    dataIndex: "GevmeEmail",
    key: "GevmeEmail"
  },
  {
    title: "Prenium",
    dataIndex: "Prenium",
    key: "Prenium"
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

export default class UserAdmin extends Component {
  state = {
    user: [],
    newData: []
  };
  componentDidMount() {
    axios
      .get(`https://my.api.mockaroo.com/newadmin.json?key=3615c370`)
      .then(res => {
        const user = res.data;
        this.setState({ 
          user
         });
      })
      .then(() => {
        this.formatData();
      });
  }
  formatData = () => {
    let { user } = this.state;
    let newData = [];
    newData = user.map(item => ({
      key: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      Gender: item.Gender,
      Country: item.Country,
      Email: item.Email,
      Birthday: item.Birthday,
      Company: item.Company,
      GevmeEmail: item.GevmeEmail,
      Prenium: item.Prenium ? "Yes" : "No"
    }));
    this.setState({
      newData: newData
    });
  };


  render() {
    let { newData } = this.state;
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
        >
          <NavLink to="/managerment/admin/add" >Add a row</NavLink>
        </Button>
        <Table columns={columns} dataSource={(newData)}  scroll={{ x: 1300 }} />
      </div>
    );
  }
}
