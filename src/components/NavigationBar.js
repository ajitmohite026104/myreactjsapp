import React, { createRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SearchComponent from "./SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// import { faCog } from "@fortawesome/free-solid-svg-icons";
//import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
//import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
//import LoginService from "../services/loginService";
//import OverlayTrigger from "react-bootstrap/OverlayTrigger";
//import Tooltip from "react-bootstrap/Tooltip";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));
    this.setState({
      isLoggedIn: sessionStorage.getItem("auth_cookie") ? true : false,
      isAdmin: userData ? userData.isAdmin : false,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userData !== prevProps.userData) {
      let userData = JSON.parse(sessionStorage.getItem("user_info"));
      this.setState({
        isLoggedIn: sessionStorage.getItem("auth_cookie") ? true : false,
        isAdmin: userData ? userData.isAdmin : false,
      });
    }
  }

  logout(event) {
    sessionStorage.clear();
    this.setState({
      isLoggedIn: false,
      isAdmin: false,
    });
  }

  wrapper = createRef();

  render() {
    const { isLoggedIn, isAdmin } = this.state;
    let button;

    if (isLoggedIn) {
      button = (
        <Navbar.Collapse id="basic-navbar-nav" className="float-right">
          <Nav className="mr-auto">
            <NavDropdown
              title={<FontAwesomeIcon icon={faUser} />}
              id="basic-nav-dropdown"
            >
              {/* <NavDropdown.Item href="/profile"><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon icon={faHistory} /> History</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3"><FontAwesomeIcon icon={faCog} /> Account Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavDropdown.Item> */}
              <Nav.Link as={NavLink} to="/profile" exact>
                <FontAwesomeIcon icon={faUser} /> Profile
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="/history">
                <FontAwesomeIcon icon={faHistory} /> History
              </Nav.Link>
              <Nav.Link as={NavLink} to="/settings">
                <FontAwesomeIcon icon={faCog} /> Account Settings
              </Nav.Link> */}
              <NavDropdown.Divider />
              <Nav.Link as={NavLink} onClick={this.logout} to="/login">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      button = (
        <Navbar.Brand>
          <Link to="/Login"> Login </Link>{" "}
        </Navbar.Brand>
      );
    }
    return (
      <Navbar bg="light" expand="lg" ref={this.wrapper}>
        <Navbar.Brand>
          <Link to="/">
            {" "}
            <FontAwesomeIcon icon={faHome} /> Ingenuity
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link to="/browse">
            {" "}
            <FontAwesomeIcon icon={faBookReader} /> Browse
          </Link>
        </Navbar.Brand>
        {isAdmin && (
          <Navbar.Brand>
            <Link to="/course/create">
              {" "}
              <FontAwesomeIcon icon={faPlusSquare} /> Course
            </Link>
          </Navbar.Brand>
        )}

        {/* <Navbar.Brand><Link to="/About"> About </Link></Navbar.Brand>
                <Navbar.Brand><Link to="/GithubUsers"> Users </Link> </Navbar.Brand> */}
        {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                </Form> */}
        <SearchComponent></SearchComponent>
        <Navbar.Brand>
          {/* <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip>
                <strong>Notifications</strong>
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faBell} />
          </OverlayTrigger> */}
        </Navbar.Brand>
        {button}
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state,
  };
}

export default connect(mapStateToProps)(NavigationBar);
