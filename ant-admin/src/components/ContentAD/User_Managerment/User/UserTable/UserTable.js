import React, { PureComponent } from "react";

import { Table, Divider, Popconfirm, Pagination, Icon, Popover } from "antd";
import { NavLink, withRouter } from "react-router-dom";

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
        title: "Premium",
        dataIndex: "isPremium",
        key: "isPremium"
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
              {this.props.users.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={this.handleDelete(record.key)}
                  onCancel={this._onCancel}
                >
                  <Popover content={deleteUser} onClick={this._preventEvent}>
                    <Icon style={{ color: "#1890ff" }} type="delete" />
                  </Popover>
                </Popconfirm>
              ) : null}
            </span>
          );
        }
      }
    ];
  }

  state = {
    currentPage: 1,
    persons: []
  };

  componentDidMount() {
    this.getPageUrl();
  }

  handleDelete = key => event => {
    event.stopPropagation();
    this.props.onDeleteUser(key, () => {
      this.props.onGetListUser(this.state.currentPage);
    });
  };

  handlePagination = (page, pageSize) => {
    this.setState({
      currentPage: Number(page)
    });
    this.props.onGetListUser(page);
    this.props.history.push(`/managerment/user?page=${page}`);
  };

  getPageUrl = () => {
    const url = window.location;
    const urlString = new URL(url);
    const page = urlString.searchParams.get("page");
    let checkPage = page;
    if (page > 3) checkPage = 3;
    else if (page < 1) checkPage = 1;
    this.handlePagination(checkPage);
    this.setState({
      currentPage: Number(checkPage)
    });
  };

  _onCancel = event => {
    event.stopPropagation();
  };

  _preventEvent = event => {
    event.stopPropagation();
  };

  render() {
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title
        })
      };
    });
    
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.users}
          scroll={{ x: 1600 }}
          pagination={false}
          onRow={(record, index) => {
            return {
              onClick: () => {
                this.props.history.push(
                  `/managerment/user/update?id=${record.id}`
                );
              }
            };
          }}
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
