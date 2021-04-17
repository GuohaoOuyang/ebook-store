import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import bookImage from "../utils/images/book.jpeg";
import { useSelector } from "react-redux";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

const StyledJumbotron = styled(Jumbotron)`
  background-image: url(${bookImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0 20%;
  height: 800px;
  text-align: center;
  h1 {
    font-family: "Big Caslon";
    color: ${(props) => props.theme.palette.primary};
    font-size: 3em;
  }
  p {
    color: ${(props) => props.theme.palette.primary};
    font-family: "Metropolis";
  }
  button {
    background-color: white;
    color: ${(props) => props.theme.palette.lightblack};
    font-family: "Metropolis";
    font-size: 0.8em;
    border: none;
    outline: none;
    margin-top: 1em;
    padding: 1em 4em;
    transition: all 0.5s;
    span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
    }
    span: after {
      content: "\\20D7";
      position: absolute;
      opacity: 0;
      font-size: 2em;
      top: 0;
      right: -0.4em;
      transition: 0.5s;
    }
    :hover span {
      transform: translate3d(-0.5em, 0, 0);
    }
    :hover span: after {
      opacity: 1;
      right: -0.8em;
    }
  }
`;

const ProductBanner = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [signupModal, setSignupModal] = useState(false);

  const [signinModal, setSigninModal] = useState(false);

  return (
    <StyledJumbotron
      fluid="true"
      className="d-flex flex-column align-items-center justify-content-center">
      <h1>Your one-stop shop </h1>
      <h1>for books</h1>
      <p>Shop New &amp; Hot books, all in one place.</p>
      {!userInfo && (
        <>
          <button onClick={() => setSignupModal(true)}>
            <span>Sign Up to Shop</span>
          </button>
          <SignupModal
            show={signupModal}
            onHide={() => setSignupModal(false)}
            handleSignIn={() => setSigninModal(true)}
          />
          <SigninModal
            show={signinModal}
            onHide={() => setSigninModal(false)}
            handleSignUp={() => setSignupModal(true)}
          />
        </>
      )}
    </StyledJumbotron>
  );
};

export default ProductBanner;
