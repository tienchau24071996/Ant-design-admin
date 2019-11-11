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
import moment from "moment";
import axios from "axios";
import "./UserUpdate.css";

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
    userDetail: {
      birthday: ""
    },
    loading: false
  };

  componentDidMount() {
    axios
      .get(`https://my.api.mockaroo.com/userdetail.json?key=98993900`)
      .then(res => {
        const userDetail = res.data;
        this.setState({
          userDetail
        });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail,
        [name]: value
      }
    }));
  };

  handleChangeSelect = event => {
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail,
        gender: event
      }
    }));
  };

  handleChangeDate = (event, t) => {
    this.setState(prevState => ({
      userDetail: {
        ...prevState.userDetail,
        birthday: t
      }
    }));
  };

  _onSubmit = type => ()  => {
    console.log(this.state.userDetail);
    notification[type]({
      message: "Update successful",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification."
    });
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
    let { userDetail } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload Avatar</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div>
        <h3>Basic Setting</h3>
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
                      value={userDetail.first_name}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item>
                    <span>Last name</span>
                    <Input
                      name="last_name"
                      value={userDetail.last_name}
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
                      value={userDetail.gender}
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
                        !userDetail.birthday
                          ? null
                          : moment(userDetail.birthday, dateFormat)
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
                  value={userDetail.email}
                />
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Input
                  name="country"
                  onChange={this.handleChange}
                  value={userDetail.country}
                />
              </Form.Item>

              <Form.Item>
                <span>gevme Email</span>
                <Input value={userDetail.gevmeEmail} disabled />
              </Form.Item>

              <Form.Item>
                <span>Prenium</span>
                <Input value={userDetail.prenium ? "Yes" : "No"} disabled />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this._onSubmit("success")}
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
