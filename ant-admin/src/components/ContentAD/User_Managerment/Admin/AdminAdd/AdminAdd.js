import React, { Component } from "react";
import { Form, Input, Row, Col, Button, Select, DatePicker, Icon } from "antd";
import { NavLink } from "react-router-dom";
import validator from "validator";

const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

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

export default class AddAdmin extends Component {
  state = {
    dataAdmin: {
      first_name: "",
      last_name: "",
      country: "",
      email: "",
      company: "",
      gender: "",
      birthday: null
    },
    ischeckBirthday: false,
    emailError: false,
    first_nameError: false,
    last_nameError: false,
    genderError: false,
    countryError: false,
    companyError: false
  };

  handleAdd = () => {
    this.props.onUpAdmin(this.state.dataAdmin);
  };

  handleGetDate = (moment, dateString) => {
    let datenow = new Date();
    let yearnow = datenow.getFullYear();
    let monthnow = datenow.getUTCMonth() + 1;
    let daynow = ("0" + datenow.getDate()).slice(-2);
    let datenew = moment._d;
    let yearnew = datenew.getFullYear();
    let monthnew = datenew.getUTCMonth() + 1;
    let daynew = ("0" + datenew.getDate()).slice(-2);
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        birthday: dateString
      }
    }));
    if (yearnew > yearnow) {
      this.setState({ ischeckBirthday: true });
    } else if (yearnew < yearnow) {
      this.setState({ ischeckBirthday: false });
    } else if ((yearnew = yearnow)) {
      if (monthnew < monthnow) {
        this.setState({ ischeckBirthday: false });
      } else if (monthnew > monthnow) {
        this.setState({ ischeckBirthday: true });
      } else if ((monthnew = monthnow)) {
        if (daynew >= daynow) {
          this.setState({ ischeckBirthday: true });
        } else if (datenew < datenow) {
          this.setState({ ischeckBirthday: false });
        }
      }
    }
  };

  handleSelect = event => {
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        gender: event
      }
    }));
  };
  handleSelectCountry = event => {
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        country: event
      }
    }));
  };

  handleGetValue = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        [name]: value
      }
    }));
  };

  handleChangeEmail = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      dataAdmin: {
        ...prevState.dataAdmin,
        [name]: value
      }
    }));
    this.handleErrorEmail(event.target.value);
  };

  handleErrorEmail = value => {
    this.setState({
      emailError: !validator.isEmail(value)
    });
  };

  render() {
    let { emailError, ischeckBirthday, dataAdmin } = this.state;
    const disabled =
      !ischeckBirthday &&
      !emailError &&
      dataAdmin.first_name &&
      dataAdmin.last_name &&
      dataAdmin.country &&
      dataAdmin.email &&
      dataAdmin.birthday &&
      dataAdmin.company
        ? false
        : true;

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
          <Row>
            <Col xs={24} sm={24} md={6} style={{ width: "100%" }}>
              <Form.Item label="First name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.first_name}
                  name="first_name"
                />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.last_name}
                  name="last_name"
                />
              </Form.Item>
              <Form.Item label="Gender">
                <Select
                  onChange={this.handleSelect}
                  value={this.state.dataAdmin.gender}
                  name="gender"
                >
                  <Option value="Female">Female</Option>
                  <Option value="Male">Male</Option>
                  <Option value="Other">Other</Option>
                </Select>{" "}
              </Form.Item>
              <Form.Item label="Country">
                <Select
                  showSearch
                  name="country"
                  onChange={this.handleSelectCountry}
                  value={dataAdmin.country}
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
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  onChange={this.handleChangeEmail}
                  value={this.state.dataAdmin.email}
                  name="email"
                />
                {emailError ? (
                  <div style={{ color: "red" }}>
                    Invalid email, please enter again
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="Birthday">
                <DatePicker
                  onChange={this.handleGetDate}
                  format={dateFormatList}
                  style={{ width: "100%" }}
                />
                {ischeckBirthday ? (
                  <div style={{ color: "red" }}>
                    Invalid birthday, please enter again
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="Company">
                <Input
                  onChange={this.handleGetValue}
                  value={this.state.dataAdmin.company}
                  name="company"
                />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={this.handleAdd}
              type="primary"
              style={{ marginBottom: 16 }}
              disabled={disabled}
            >
              <NavLink to="/managerment/admin/updatefinish">Add</NavLink>
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
