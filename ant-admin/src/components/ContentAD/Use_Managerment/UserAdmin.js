import React, { Component } from "react";
import {
  Table,
  Divider,
  Button,
  Pagination,
  Icon,
  Popover,
  Popconfirm
} from "antd";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
        key: "operation",
        fixed: "right",
        width: 80,
        render: (text, record) => (
          <span>
            <NavLink to={`admin/update?id=${record.id}`}>
              <Popover content="Edit Admin">
                <Icon type="edit" />
              </Popover>
            </NavLink>
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>
                <Icon type="delete" />
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];
    this.state = {
      user: [],
      newData: [],
      key: ""
    };
  }
  componentDidMount() {
    this.getData();
  }

  formatData = () => {
    let { user } = this.state;
    let newData = [];
    newData = user.map(item => ({
      id: item.id,
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
  handleChangePage = (page, pageSize) => {
    this.getData(page);
  };

  handleDelete = key => {
    const newData = [...this.state.newData];
    this.setState({ newData: newData.filter(item => item.key !== key) });
    axios.delete(
      `http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${key}`,
      newData
    );
  };

  getData = (page = 1) => {
    axios
      .get(
        `http://5dcb85f734d54a0014315051.mockapi.io/api/admin?page=${page}&limit=10`
      )
      .then(res => {
        const user = res.data;
        this.setState({
          user
        });
      })
      .then(() => {
        this.formatData();
      });
  };

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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title
        })
      };
    });

    return (
      <div>
        <Button type="primary" style={{ marginBottom: 16 }}>
          <NavLink to="/managerment/admin/add">Add a row</NavLink>
        </Button>
        <Table
          columns={columns}
          dataSource={newData}
          scroll={{ x: 1300 }}
          pagination={false}
        />
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={this.handleChangePage}
          style={{ textAlign: "end", paddingTop: "5px" }}
        />
      </div>
    );
  }
}
