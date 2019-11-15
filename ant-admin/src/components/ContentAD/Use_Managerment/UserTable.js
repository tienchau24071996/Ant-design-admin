import React, { PureComponent } from "react";

import { Table, Divider, Popconfirm, Pagination, Icon, Popover } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import "./UserUpdate.css";

const editUser = (
  <div>
    <span>Edit user</span>
  </div>
);

const deleteUser = (
  <div>
    <span>Delete user</span>
  </div>
);

class UserTable extends PureComponent {
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
        width: 200,
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
        width: 80,
        fixed: "right",
        render: (text, record) => {
          return (
            <span>
              <NavLink to={`/managerment/user/update?id=${record.id}`}>
                <Popover content={editUser}>
                  <Icon type="edit" />
                </Popover>
              </NavLink>
              <Divider type="vertical" />
              {this.state.newData.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => this.handleDelete(record.key)}
                >
                  <a href="/">
                    <Popover content={deleteUser}>
                      <Icon type="delete" />
                    </Popover>
                  </a>
                </Popconfirm>
              ) : null}
            </span>
          );
        }
      }
    ];

    this.state = {
      user: [],
      newData: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.getPageUrl()
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
    axios
      .delete(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${key}`,
        newData
      )
      .then(res => {
        console.log(res.data);
      });
  };

  getData(page = 1) {
    axios
      .get(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient?p=${page}&l=10`
      )
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
      .then(() => {
        this.formatData();
      });
  }

  handlePagination = (page, pageSize) => {    
    this.setState({
      currentPage : Number(page)
    })
    this.getData(page);
    this.props.history.push(`/managerment/user?page=${page}`);
  };

  getPageUrl = () => {
    const url = window.location;
    const urlString = new URL(url);
    const page = urlString.searchParams.get("page");
    this.handlePagination(page)
    this.setState({
      currentPage: Number(page)
    })
  }
  
  render() {
    let { newData } = this.state;
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
        })
      };
    });
    return (
      <div>
        <Table
          columns={columns}
          dataSource={newData}
          scroll={{ x: 1600 }}
          pagination={false}
        ></Table>
        <Pagination
          style={{ textAlign: "right", paddingTop: "20px" }}
          defaultCurrent={1}
          current={this.state.currentPage}
          total={30}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

export default withRouter(UserTable);
