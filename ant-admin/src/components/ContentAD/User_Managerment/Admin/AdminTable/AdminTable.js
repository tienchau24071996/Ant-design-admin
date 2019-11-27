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

class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "fistName"
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        key: "lastName"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country"
      },
      {
        title: "Email Address",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Birthday",
        dataIndex: "birthday",
        key: "birthday"
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company"
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
                <Icon type="delete" style={{ color: "#1890ff" }} />
              </Popover>
            </Popconfirm>
          </span>
        )
      }
    ];

    this.state = {
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

  handleChangePage = (page = 1, pageSize) => {
    this.setState({ currentPage: Number(page) });
    this.props.onGetListAdmin(page);
    this.props.history.push(`/managerment/admin?page=${page}`);
  };

  _preventEvent = event => {
    event.stopPropagation();
  };

  handleDelete = key => event => {
    event.stopPropagation();
    this.props.onDeleteAdmin(key, () => {
      this.props.onGetListAdmin(this.state.currentPage);
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
    let { currentPage } = this.state;
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
          dataSource={this.props.dataAdmin}
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
