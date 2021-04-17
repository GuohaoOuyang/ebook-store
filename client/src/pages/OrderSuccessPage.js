import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledContainer = styled(Container)`
  padding-top: 180px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  // align-items: center;
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
  .orderId {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: rgb(118, 118, 118);
  }
`;

const StyledButtonUp = styled.button`
  background-color: ${(props) => props.theme.palette.secondary};
  font-size: 0.8em;
  color: white;
  width: 18em;
  height: 4em;
  font-family: "Metropolis";
  border-style: none;
  outline: none;
  margin-top: 1em;
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
    right: -0.6em;
    transition: 0.5s;
  }
  :hover span {
    transform: translate3d(-0.8em, 0, 0);
  }
  :hover span: after {
    opacity: 1;
    right: -0.8em;
  }
`;

const StyledButtonDown = styled.button`
  background-color: white;
  font-size: 0.8em;
  color: ${(props) => props.theme.palette.secondary};
  width: 18em;
  border: 1px solid black;
  height: 4em;
  font-family: "Metropolis";
  outline: none !important;
  margin-top: 1em;
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
    right: -0.6em;
    transition: 0.5s;
  }
  :hover span {
    transform: translate3d(-0.8em, 0, 0);
  }
  :hover span: after {
    opacity: 1;
    right: -0.8em;
  }
`;

const OrderSuccessPage = ({ match }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderId = match.params.id;

  return (
    <>
      <StyledContainer>
        <Row className="orderId justify-content-center">
          <Col md={{ span: 3, offset: 9 }} xs={{ span: 9, offset: 3 }}>
            order #{orderId}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <h1>Thank you {userInfo.firstName}</h1>
        </Row>
        <Row className="justify-content-center">
          <p>Sit back and relax, your order's on its way!</p>
        </Row>
        <Row className="justify-content-center">
          <Link to={`/order/${orderId}`}>
            <StyledButtonUp>
              <span>View Order</span>
            </StyledButtonUp>
          </Link>
        </Row>
        <Row className="justify-content-center">
          <Link to="/">
            <StyledButtonDown>
              <span>Continue Shopping</span>
            </StyledButtonDown>
          </Link>
        </Row>
      </StyledContainer>
    </>
  );
};

export default OrderSuccessPage;
