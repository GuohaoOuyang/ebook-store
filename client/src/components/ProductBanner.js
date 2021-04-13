import React from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
import bookImage from "../utils/images/book.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
    border-style: none;
    outline: none !important;
    margin-top: 1em;
    padding: 1em 4em;
  }
`;

const ProductBanner = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <StyledJumbotron
      fluid="true"
      className="d-flex flex-column align-items-center justify-content-center">
      <h1>Your one-stop shop </h1>
      <h1>for books</h1>
      <p>Shop New &amp; Hot books, all in one place.</p>
      {!userInfo && (
        <Link to="/register">
          <button>Sign Up to Shop</button>
        </Link>
      )}
    </StyledJumbotron>
  );
};

export default ProductBanner;
