import React from "react";
import { useSelector } from "react-redux";
import { Row, Container } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContainer = styled(Container)`
  margin-left: 20vw;
  margin-right: 20vw;
  padding-top: 180px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.palette.lightblack};

  h1 {
    font-family: "Big Caslon";
    font-size: 2em;
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.lightblack};
  }

  p {
    font-family: "Metropolis";
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.lightblack};
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.palette.secondary};
  font-size: 1em;
  color: white;
  font-family: "Metropolis";
  border-style: none;
  outline: none !important;
  padding: 0.8em 4em;
  margin-top: 1em;
`;

const OrderSuccessPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <StyledContainer className="justify-content-md-center">
        <Row>
          <h1>Thank you {userInfo.name}</h1>
        </Row>
        <Row>
          <p>Sit back and relax, your order's on its way!</p>
        </Row>
        <Row className="justify-content-md-center">
          <Link to="/">
            <StyledButton>Continue Shopping</StyledButton>
          </Link>
        </Row>
      </StyledContainer>
    </>
  );
};

export default OrderSuccessPage;
