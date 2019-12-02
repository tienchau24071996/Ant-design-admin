import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Button, Icon } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import validator from "validator";
import "./AdminUpdate.css";

const dateFormat = ["MM/DD/YYYY", "MM/DD/YY"];
const { Option } = Select;
const ButtonGroup = Button.Group;
const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan (Province of China)",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];

export default class UpdateAdmin extends Component {
  state = {
    adminUpdate: {},
    emailError: false,
    ischeckBirthday: false
  };

  componentDidMount() {
    this.handleAdmin();
  }

  handleAdmin = () => {
    this.props.onGetAdmin(data => {
      this.setState({
        adminUpdate: data
      });
    });
  };

  handleChangeDate = (moment, dateString) => {
    let datenow = new Date();
    let yearnow = datenow.getFullYear().toString();
    let monthnow = (datenow.getUTCMonth() + 1).toString();
    let daynow = ("0" + datenow.getDate()).slice(-2).toString();
    let datenew = dateString;
    let yearnew = datenew.slice(6, 10);
    let monthnew = datenew.slice(0, 2);
    let daynew = datenew.slice(3, 5);
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        birthday: dateString
      }
    }));
    if (yearnew > yearnow) {
      this.setState({ ischeckBirthday: true });
    } else if (yearnew < yearnow) {
      this.setState({ ischeckBirthday: false });
    } else if (yearnew === yearnow) {
      if (monthnew < monthnow) {
        this.setState({ ischeckBirthday: false });
      } else if (monthnew > monthnow) {
        this.setState({ ischeckBirthday: true });
      } else if (monthnew === monthnow) {
        if (daynew > daynow) {
          this.setState({ ischeckBirthday: true });
        } else if (datenew <= datenow) {
          this.setState({ ischeckBirthday: false });
        }
      }
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        [name]: value
      }
    }));
  };

  handleChangeSelect = event => {
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        gender: event
      }
    }));
  };
  handleChangeSelectCountry = event => {
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        country: event
      }
    }));
  };

  handleErrorEmail = value => {
    this.setState({
      emailError: !validator.isEmail(value)
    });
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      adminUpdate: {
        ...prevState.adminUpdate,
        [name]: value
      }
    }));
    this.handleErrorEmail(event.target.value);
  };

  handleClick = () => {
    this.props.onUpdateAdmin(this.state.adminUpdate);
  };

  render() {
    let { emailError, ischeckBirthday, adminUpdate } = this.state;
    const isCheckFirstName = !this.props.isLoading && !adminUpdate.first_name;
    const isCheckLastName = !this.props.isLoading && !adminUpdate.last_name;
    const ischeckCountry = !this.props.isLoading && !adminUpdate.country;
    return (
      <div>
        <ButtonGroup style={{ marginBottom: 16 }}>
          <NavLink to="/managerment/admin">
            <Button type="primary" style={{ borderRadius: "6px" }}>
              <Icon type="left" />
              <span style={{ fontSize: "16px" }}>Back</span>
            </Button>
          </NavLink>
        </ButtonGroup>
        <Form>
          <Row style={{ height: "100%" }}>
            <Col xs={24} sm={24} md={6} style={{ width: "100%" }}>
              <Row style={{ height: "100%" }}>
                <Col>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <span>First name</span>
                    <Input
                      className={isCheckFirstName ? "inputFirstName" : null}
                      name="first_name"
                      onChange={this.handleChange}
                      value={adminUpdate.first_name}
                      autoComplete="true"
                    />
                    {isCheckFirstName ? (
                      <div style={{ height: "30px", color: "red" }}>
                        Can't empty
                      </div>
                    ) : (
                      <div style={{ height: "30px" }}></div>
                    )}
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ marginBottom: "0px" }}>
                    <span>Last name</span>
                    <Input
                      className={isCheckLastName ? "inputLastName" : null}
                      name="last_name"
                      onChange={this.handleChange}
                      value={adminUpdate.last_name}
                    />
                    {isCheckLastName ? (
                      <div style={{ height: "30px", color: "red" }}>
                        Can't empty
                      </div>
                    ) : (
                      <div style={{ height: "30px" }}></div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item>
                    <span>Gender</span>
                    <Select
                      name="gender"
                      onChange={this.handleChangeSelect}
                      value={adminUpdate.gender}
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <span>Birthday</span>
                    <DatePicker
                      name="date"
                      format={dateFormat}
                      onChange={this.handleChangeDate}
                      style={{ width: "100%" }}
                      value={
                        adminUpdate.birthday
                          ? moment(adminUpdate.birthday, dateFormat)
                          : null
                      }
                    />
                    {ischeckBirthday ? (
                      <div style={{ color: "red" }}>
                        Invalid birthday, please enter again
                      </div>
                    ) : null}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <span>Email</span>
                <Input
                  className={emailError ? "inputEmail" : null}
                  name="email"
                  onChange={this.handleChangeEmail}
                  value={adminUpdate.email}
                />
                {emailError ? (
                  <div style={{ color: "red" }}>
                    Invalid email, please enter again
                  </div>
                ) : null}
              </Form.Item>

              <Form.Item>
                <span>Country</span>
                <Select
                  showSearch
                  className={ischeckCountry ? "inputCountry" : null}
                  name="country"
                  onChange={this.handleChangeSelectCountry}
                  value={adminUpdate.country}
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countryList.length > 0 &&
                    countryList.map((item, key) => (
                      <Option value={item} key={key}>
                        {item}
                      </Option>
                    ))}
                </Select>
                {ischeckCountry ? (
                  <div style={{ height: "30px", color: "red" }}>
                    Can't empty
                  </div>
                ) : (
                  <div style={{ height: "30px" }}></div>
                )}
              </Form.Item>

              <Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleClick}
                  >
                    <NavLink to="/managerment/admin/updatefinish">
                      Update
                    </NavLink>
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
