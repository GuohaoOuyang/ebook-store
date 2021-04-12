import React, { useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../utils/images/logo.png";
import styled from "styled-components";
import { Navbar, Nav, Container, NavDropdown, NavLink } from "react-bootstrap";
import { ShoppingCartIcon } from "react-line-awesome";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import SigninModal from "./SigninModal";

const StyledWrap = styled.div`
  .navbar {
    background-color: ${(props) => props.theme.palette.primary};
  }

  .signin {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: ${(props) => props.theme.palette.darkgrey} !important;
    &:hover {
      color: black !important;
    }
  }
  .account {
    font-family: "Metropolis";
    font-size: 0.8em;
  }
`;

const StyledUser = styled.p`
  font-family: "Metropolis";
  font-size: 0.8em;
  color: ${(props) => props.theme.palette.darkgrey};
  margin-left: 1em;
  margin-right: 1em;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.palette.darkgrey};
  &:hover {
    color: black;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.palette.secondary};
  font-size: 0.8em;
  color: white;
  font-family: "Metropolis";
  border-style: none;
  margin-left: 1.5em;
  outline: none !important;
  padding-left: 2em;
  padding-right: 2em;
`;

const Header = () => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <StyledWrap>
        <Navbar className="navbar" expand="md" fixed="top">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} width="60" alt="fair-logo" />
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
              <LinkContainer to="/cart">
                <StyledLink>
                  <ShoppingCartIcon className="cartIcon la-lg" />
                </StyledLink>
              </LinkContainer>

              <Nav>
                {userInfo ? (
                  <>
                    <StyledUser className="my-auto">
                      Hello, {userInfo.name}
                    </StyledUser>
                    <NavDropdown
                      title="Account"
                      id="collasible-nav-dropdown"
                      className="account">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item className="account">
                          order history
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                        onClick={logoutHandler}
                        className="account">
                        logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      className="signin"
                      onClick={() => setModalShow(true)}>
                      Sign In
                    </Nav.Link>
                    <SigninModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                    <LinkContainer to="/register">
                      <StyledButton>Sign Up to Shop</StyledButton>
                    </LinkContainer>
                  </>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </StyledWrap>
    </header>
  );
};

export default Header;
