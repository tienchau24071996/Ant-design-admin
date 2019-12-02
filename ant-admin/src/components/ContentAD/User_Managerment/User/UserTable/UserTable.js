import React, { PureComponent } from "react";

import { Table, Divider, Popconfirm, Pagination, Icon, Popover, Input, Button } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import Highlighter from 'react-highlight-words';

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
        key: "firstName",
        ...this.getColumnSearchProps('firstName'),
      },
      {
        title: "Last name",
        width: 150,
        dataIndex: "lastName",
        key: "lastName",
        ...this.getColumnSearchProps('lastName'),
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
    persons: [],
    searchText: '',
    searchedColumn: ''
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
    (this.state.searchedColumn === dataIndex) ?
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
      : text
    ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ 
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
      });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
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
