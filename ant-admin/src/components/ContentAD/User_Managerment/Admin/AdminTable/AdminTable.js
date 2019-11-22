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
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";

class UserAdmin extends Component {
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
              onCancel={this._onCancel}
              onConfirm={this.handleDelete(record.key)}
            >
              <Popover content="Delete" onClick={this._preventEvent}>
                  <Icon type="delete" style={{color:"#1890ff"}} />
              </Popover>
            </Popconfirm>
          </span>
        )
      }
    ];

    this.state = {
      user: [],
      newData: [],
      key: "",
      currentPage: 1
    };
  }

  componentDidMount() {
    this.getURL();
  }

  _onCancel = event => {
    event.stopPropagation();
  };

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
      Premium: item.Premium ? "Yes" : "No"
    }));
    this.setState({
      newData: newData
    });
  };

  handleChangePage = (page = 1, pageSize) => {
    this.getData(page);
    this.props.history.push(`/managerment/admin?page=${page}`);
    this.setState({ currentPage: Number(page) });
  };

  _preventEvent = event => {
    event.stopPropagation();
  };

  handleDelete = key => event => {
    event.stopPropagation();  
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

  getURL = () => {
    const url = window.location;
    const urlString = new URL(url);
    let page = urlString.searchParams.get("page");
    if (page > 3) {
      page = 3;
    } else if (page < 1) {
      page = 1;
    } else if (page === 2) {
      page = 2;
    } else if (page === 3) {
      page = 3;
    } else if (typeof page === "string") {
      page = 1;
    }
    this.setState({
      currentPage: Number(page)
    });
    this.handleChangePage(page);
  };

  handleRow = (record, index) => {
    console.log(record.id);
  };

  render() {
    let { newData, currentPage } = this.state;
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
          <NavLink to="/managerment/admin/add">Add admin</NavLink>
        </Button>
        <Table
          columns={columns}
          dataSource={newData}
          scroll={{ x: 1300 }}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                this.props.history.push(
                  `/managerment/admin/update?id=${record.id}`
                );
              }
            };
          }}
        />
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={30}
          onChange={this.handleChangePage}
          style={{ textAlign: "end", paddingTop: "5px" }}
        />
      </div>
    );
  }
}

export default withRouter(UserAdmin);
