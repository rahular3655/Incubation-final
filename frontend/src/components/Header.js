import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="title">
      {/* <li>
            <span><Link to="/" >Home</Link><br></br></span>
            <span><Link to="/profile" >Profile</Link></span>
            
            <span>|</span>

            {user ? (
                 <p className='cursor-pointer' onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
            </li>
            {user &&   <p>Hello {user.username}</p>}
            */}
      <Navbar bg="light" expand="lg">
        <Container className="Navbar-container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-items">
                <Link className="nav-items" to="/">Home</Link>
              </Nav.Link>
              <Nav.Link className="nav-items">
                <Link className="nav-items" to="/profile">Profile</Link>
              </Nav.Link>
              <Nav.Link className="nav-items">
                 {user ? (
                <p className="cursor-pointer" onClick={logoutUser}>
                  Logout
                </p>
              ) : (
                <Link to="/login">Login</Link>
              )}
              </Nav.Link>
             
              {/* <div className="user-title-nav">
                 {user && <p>Hello {user.username}</p>}
              </div> */}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
