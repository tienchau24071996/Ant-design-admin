import React, { Component } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  notification,
  Upload,
  Icon,
  message
} from "antd";
import moment from "moment"
import "./UserUpdate.css"

const { Option } = Select;
const dateFormat = "MM/DD/YYYY";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class UserUpdate extends Component {
  state = {
    loading: false,
    userUpdate: {}
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    await this.props.onGetUser();
    this.setState({
      userUpdate: this.props.userDetail
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        [name]: value
      }
    }));
  };

  handleChangeSelect = event => {
    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        gender: event
      }
    }));
  };

  handleChangeDate = (event, t) => {
    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        birthday: t
      }
    }));
  };

  _onSubmit = type => () => {
    if (!this.props.isError) {
      notification[type]({
        message: "Update successful",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });
    } else {
      notification[type]({
        message: "Update Fail",
        description: "Update fail"
      });
    }
    let { userUpdate } = this.state;
    this.props.onUpdateUser(userUpdate);
    console.log(userUpdate);
    
  };

  handleChangeUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const { imageUrl, userUpdate } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload Avatar</div>
      </div>
    );

    return (
      <div style={{ paddingTop: "14px" }}>
        <Form>
          <Row>
            <Col xs={24} sm={24} md={6}>
              <Upload
                style={{ textAlign: "center" }}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChangeUpload}
              >
                {imageUrl ? (
                  <img
                    className="avatar-image"
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>

            <Col xs={24} sm={24} md={18}>
              <Row>
                <Col span={12} style={{ paddingRight: "30px" }}>
                  <Form.Item>
                    <span>First name</span>
                    <Input
                      name="first_name"
                      value={userUpdate.first_name}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>Last name</span>
                    <Input
                      name="last_name"
                      value={userUpdate.last_name}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12} style={{ paddingRight: "30px" }}>
                  <Form.Item>
                    <span>Gender</span>
                    <Select
                      name="gender"
                      onChange={this.handleChangeSelect}
                      value={userUpdate.gender}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>Birthday</span>
                    <DatePicker
                      name="date"
                      value={
                        !userUpdate.birthday
                          ? null
                          : moment(userUpdate.birthday, dateFormat)
                      }
                      format={dateFormat}
                      onChange={this.handleChangeDate}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={userUpdate.email}
                />
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input
                  name="country"
                  onChange={this.handleChange}
                  value={userUpdate.country}
                />
              </Form.Item>

              <Form.Item>
                <span>Gev me email</span>
                <Input value={userUpdate.gevmeEmail} disabled />
              </Form.Item>

              <Form.Item>
                <span>Prenium</span>
                <Input value={userUpdate.prenium ? "Yes" : "No"} disabled />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this._onSubmit(
                    !this.props.isLoading && this.props.isError
                      ? "error"
                      : "success"
                  )}
                >
                  Update
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
