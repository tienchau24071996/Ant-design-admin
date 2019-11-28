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
import validator from "validator";
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
    loading: false,
    userUpdate: {
      firstName: ""
    },
    isCheckBirthday: false,
    isErrorEmail: false
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = () => {
    this.props.onGetUser(data => {
      this.setState({
        userUpdate: data
      });
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

  handleErrorEmail = value => {
    this.setState({
      isErrorEmail: !validator.isEmail(value)
    });
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        [name]: value
      }
    }));
    this.handleErrorEmail(value);
  };

  handleChangeSelect = event => {
    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        gender: event
      }
    }));
  };

  handleChangeDate = (event, dateString) => {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear();
    let monthNow = dateNow.getUTCMonth() + 1;
    let dayNow = ("0" + dateNow.getDate()).slice(-2);

    let dateNew = event._d;
    let yearNew = dateNew.getFullYear();
    let monthNew = dateNew.getUTCMonth() + 1;
    let dayNew = ("0" + dateNew.getDate()).slice(-2);

    if (yearNew < yearNow) {
      this.setState({ isCheckBirthday: false });
    } else if (yearNew > yearNow) {
      this.setState({ isCheckBirthday: true });
    } else if (yearNew === yearNow) {
      if (monthNew < monthNow) {
        this.setState({ isCheckBirthday: false });
      } else if (monthNew > monthNow) {
        this.setState({ isCheckBirthday: true });
      } else if (monthNew === monthNow) {
        if (dayNew <= dayNow) {
          this.setState({ isCheckBirthday: false });
        } else {
          this.setState({ isCheckBirthday: true });
        }
      }
    }

    this.setState(prevState => ({
      userUpdate: {
        ...prevState.userUpdate,
        birthday: dateString
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
    const { imageUrl, userUpdate, isCheckBirthday, isErrorEmail } = this.state;
    const { isLoading, isError } = this.props;
    const checkFirstName = !isLoading && !userUpdate.firstName;
    const checkLastName = !isLoading && !userUpdate.lastName;
    const checkCountry = !isLoading && !userUpdate.country;

    const checkButtonUpdate =
      !userUpdate.firstName ||
      !userUpdate.lastName ||
      !userUpdate.country ||
      isCheckBirthday ||
      isErrorEmail;
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
                  <Form.Item style={{ margin: 0 }}>
                    <span>First name</span>
                    <Input
                      className={checkFirstName ? "inputFirstName" : null}
                      name="firstName"
                      value={userUpdate.firstName}
                      onChange={this.handleChange}
                      autoComplete={"off"}
                    />
                    {checkFirstName ? (
                      <div style={{ color: "#f5222d" }}>
                        Invalid first name, please enter again
                      </div>
                    ) : (
                      <div style={{ height: "40px" }}></div>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item style={{ margin: 0 }}>
                    <span>Last name</span>
                    <Input
                      className={checkLastName ? "inputLastName" : null}
                      name="lastName"
                      value={userUpdate.lastName}
                      onChange={this.handleChange}
                      autoComplete={"off"}
                    />
                    {checkLastName ? (
                      <div style={{ color: "#f5222d" }}>
                        Invalid last name, please enter again
                      </div>
                    ) : (
                      <div style={{ height: "40px" }}></div>
                    )}
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
                  <Form.Item style={{ margin: 0 }}>
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
                    {isCheckBirthday ? (
                      <div style={{ color: "#f5222d" }}>
                        Invalid birthday, date must be smaller than current date
                      </div>
                    ) : (
                      <div style={{ height: "40px" }}></div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ margin: 0 }}>
                <span>Email</span>
                <Input
                  className={isErrorEmail ? "inputEmail" : null}
                  name="email"
                  onChange={this.handleChangeEmail}
                  value={userUpdate.email}
                  autoComplete={"off"}
                />
                {isErrorEmail ? (
                  <div style={{ color: "#f5222d" }}>
                    Invalid email, please enter again
                  </div>
                ) : (
                  <div style={{ height: "40px" }}></div>
                )}
              </Form.Item>

              <Form.Item style={{ margin: 0 }}>
                <span>Country</span>
                <Input
                  className={checkCountry ? "inputCountry" : null}
                  name="country"
                  onChange={this.handleChange}
                  value={userUpdate.country}
                  autoComplete={"off"}
                />
                {checkCountry ? (
                  <div style={{ color: "#f5222d" }}>
                    Invalid country, please enter again
                  </div>
                ) : (
                  <div style={{ height: "40px" }}></div>
                )}
              </Form.Item>

              <Form.Item>
                <span>Gev me email</span>
                <Input value={userUpdate.gevmeEmail} disabled />
              </Form.Item>

              <Form.Item>
                <span>Premium</span>
                <Input value={userUpdate.isPremium ? "Yes" : "No"} disabled />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                {checkButtonUpdate ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this._onSubmit(
                      !isLoading && isError ? "error" : "success"
                    )}
                    disabled
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this._onSubmit(
                      !isLoading && isError ? "error" : "success"
                    )}
                  >
                    Update
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
