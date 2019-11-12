import React, { PureComponent } from "react";

import { Table, Divider, Popconfirm, Pagination } from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class UserTable extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ID",
        width: 65,
        dataIndex: "id",
        key: "id"
      },
      {
        title: "First name",
        width: 150,
        dataIndex: "firstName",
        key: "firstName"
      },
      {
        title: "Last name",
        width: 150,
        dataIndex: "lastName",
        key: "lastName"
      },
      {
        title: "Gender",
        width: 80,
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "Country",
        maxWidth: 150,
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
        width: 120,
        fixed: "right",
        render: (text, record) => {
          return (
            <span>
              <NavLink to={`/managerment/user/update?id=${record.id}`}>
                Edit
              </NavLink>
              <Divider type="vertical" />
              {
                this.state.newData.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                    <a href="/">Delete</a>
                  </Popconfirm>
                ) : null
              }
            </span>
          );
        }
      }
    ];

    this.state = {
      user: [],
      newData: [],
    };
  }

  componentDidMount() {
   this.getData()
  }

  formatData = () => {
    let { user } = this.state;
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
    this.setState({
      newData: newData
    });
  };

  handleDelete = key => {
    const newData = [...this.state.newData];
    this.setState({ newData: newData.filter(item => item.key !== key) });
  };

  handleSave = row => {
    const newData = [...this.state.newData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ newData });
  };

  getData(page = 1) {
    axios
      .get(`https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient?p=${page}&l=10`)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
      .then(() => {
        this.formatData();
      });
  }
  

  handlePagination = (page, pageSize) => {
    console.log(page);
    this.getData(page)
  }

  render() {
    let { newData } = this.state
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        }),
      };
    });

    console.log(newData);
    
    return (
      <div>
        <Table columns={columns} dataSource={newData} scroll={{ x: 1500 }} pagination={false} >
            
        </Table>
        <Pagination defaultCurrent={1} total={30} onChange={this.handlePagination} />
      </div>
    );
  }
}
