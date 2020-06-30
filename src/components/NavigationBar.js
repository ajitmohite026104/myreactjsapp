import React, { createRef } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SearchComponent from "./SearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import { UserConsumer } from "../userContext";
//import { faBell } from "@fortawesome/free-solid-svg-icons";
//import { faCog } from "@fortawesome/free-solid-svg-icons";
//import { faHistory } from "@fortawesome/free-solid-svg-icons";
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
    return (
      <Navbar bg="light" sticky="top" expand="lg" ref={this.wrapper}>
        <Navbar.Brand>
          <Nav.Link href="/">
            <Image
              src="https://www.persistent.com/wp-content/uploads/2020/06/persistentsys-header-logo.png"
              width="100"
              height="40"
              className="d-inline-block align-top"
              alt="See Beyond, Rise Above"
            />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand>
              <Nav.Link href="/">
                {" "}
                <FontAwesomeIcon icon={faHome} /> Home
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Nav.Link href="/browse">
                {" "}
                <FontAwesomeIcon icon={faBookReader} /> Browse
              </Nav.Link>
            </Navbar.Brand>
            <UserConsumer>
              {(value) => {
                if (value.isLoggedIn && value.isAdmin) {
                  return (
                    <Navbar.Brand>
                      <Nav.Link href="/course/create">
                        {" "}
                        <FontAwesomeIcon icon={faPlusSquare} /> Course
                      </Nav.Link>
                    </Navbar.Brand>
                  );
                }
              }}
            </UserConsumer>
            {/* {isAdmin && (
              <Navbar.Brand>
                <Nav.Link href="/course/create">
                  {" "}
                  <FontAwesomeIcon icon={faPlusSquare} /> Course
                </Nav.Link>
              </Navbar.Brand>
            )} */}
          </Nav>
          <SearchComponent />
          <UserConsumer>
            {(value) => {
              if (value.isLoggedIn) {
                return (
                  <Nav className="mr-auto">
                    <NavDropdown
                      title={<FontAwesomeIcon icon={faUser} />}
                      id="basic-nav-dropdown"
                    >
                      <Navbar.Brand>
                        <Nav.Link as={NavLink} to="/profile">
                          <FontAwesomeIcon icon={faUser} /> Profile
                        </Nav.Link>
                      </Navbar.Brand>
                      <NavDropdown.Divider />
                      <Navbar.Brand>
                        <Nav.Link
                          as={NavLink}
                          onClick={(e) => {
                            this.logout(e);
                            value.setLogin(false);
                          }}
                          to="/login"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Nav.Link>
                      </Navbar.Brand>
                    </NavDropdown>
                  </Nav>
                );
              } else {
                return (
                  <Nav className="mr-auto">
                    <Navbar.Brand>
                      <Nav.Link href="/Login">
                        {" "}
                        <FontAwesomeIcon icon={faSignInAlt} /> Login{" "}
                      </Nav.Link>{" "}
                    </Navbar.Brand>
                  </Nav>
                );
              }
            }}
          </UserConsumer>
        </Navbar.Collapse>

        {/* <Navbar.Brand><Link to="/About"> About </Link></Navbar.Brand>
                <Navbar.Brand><Link to="/GithubUsers"> Users </Link> </Navbar.Brand> */}
        {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                </Form> */}

        {/* <Navbar.Brand>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip>
                <strong>Notifications</strong>
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faBell} />
          </OverlayTrigger>
        </Navbar.Brand> */}
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

// let button;

//     if (isLoggedIn) {
//       button = (
//         <Nav className="">
//           <NavDropdown
//             title={<FontAwesomeIcon icon={faUser} />}
//             id="basic-nav-dropdown"
//             className=""
//           >
//             <Navbar.Brand>
//               <Nav.Link as={NavLink} to="/profile">
//                 <FontAwesomeIcon icon={faUser} /> Profile
//               </Nav.Link>
//             </Navbar.Brand>
//             <NavDropdown.Divider />
//             <Navbar.Brand>
//               <Nav.Link as={NavLink} onClick={this.logout} to="/login">
//                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//               </Nav.Link>
//             </Navbar.Brand>

//             {/* <Link as={NavLink} to="/history">
//                 <FontAwesomeIcon icon={faHistory} /> History
//               </Link>
//               <Link as={NavLink} to="/settings">
//                 <FontAwesomeIcon icon={faCog} /> Account Settings
//               </Link> */}
//           </NavDropdown>
//         </Nav>
//       );
//     } else {
//       button = (
//         <Nav className="ml-auto">
//           <Navbar.Brand>
//             <Nav.Link href="/Login">
//               {" "}
//               <FontAwesomeIcon icon={faSignInAlt} /> Login{" "}
//             </Nav.Link>{" "}
//           </Navbar.Brand>
//         </Nav>
//       );
//     }
