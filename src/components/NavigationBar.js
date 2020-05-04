import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';



class NavigationBar extends React.Component {

    state = {
        isLoggedIn: this.props.isLoggedIn,
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if(isLoggedIn){
            button = <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title={<Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FontAwesomeIcon icon={faUser} />
                    </Dropdown.Toggle>} id="basic-nav-dropdown">
                    {/* <NavDropdown.Item href="/profile"><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2"><FontAwesomeIcon icon={faHistory} /> History</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3"><FontAwesomeIcon icon={faCog} /> Account Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavDropdown.Item> */}
                    <Nav.Link as={NavLink} to='/profile' exact><FontAwesomeIcon icon={faUser} /> Profile</Nav.Link>
                    <Nav.Link as={NavLink} to='/history'><FontAwesomeIcon icon={faHistory} /> History</Nav.Link>
                    <Nav.Link as={NavLink} to='/settings'><FontAwesomeIcon icon={faCog} /> Account Settings</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link as={NavLink} to='/logout'><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>;
        }else{
            button = <Navbar.Brand><Link to="/Login"> Login </Link> </Navbar.Brand>;
        }
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/"> <FontAwesomeIcon icon={faHome} /> Ingenuity</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/About"> About </Link></Navbar.Brand>
                <Navbar.Brand><Link to="/GithubUsers"> Users </Link> </Navbar.Brand>
                {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                </Form> */}
                <SearchComponent></SearchComponent>
                {button}
            </Navbar>
        );
    };
};

export default NavigationBar;
