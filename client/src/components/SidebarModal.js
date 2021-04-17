import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Modal, Container, ModalBody } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SideModal = styled(Modal)`
  > .modal-dialog {
    position: fixed;
    margin: auto;
    width: 400px;
    height: 100vh !important;
    transform: translate3d(0%, 0, 0) !important;
    transition: right 0.5s ease-out !important;
  }
  > .modal-dialog {
    right: -400px;
    > .modal-content {
      height: 100%;
      overflow-y: auto;
    }
  }

  &.show > .modal-dialog {
    right: 0;
  }

  .modal-content {
    border-radius: 0;
    border: none;
  }

  .header {
    margin-top: 2em;
    border: none;
    font-family: "Sentinel";
    color: ${(props) => props.theme.palette.lightblack};
    .h4 {
      font-size: 0.8em;
    }
    .close {
      font-size: 1em;
      &:focus {
        outline: none;
      }
    }
  }
  .title {
    font-family: "Metropolis";
    border: none;
    background-color: rgb(247, 248, 251);
    font-size: 0.8em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .body {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: ${(props) => props.theme.palette.lightblack};
    padding: 1em 2em;
  }
`;

const CartButton = styled.button`
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 0.8em;
  font-weight: 600;
  color: white;
  font-family: "Metropolis";
  border-style: none;
  outline: none !important;
  padding: 0.8em 2em;
  margin-top: 2em;
  width: 100%;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const ContinueButton = styled.button`
  background-color: white;
  font-size: 0.8em;
  color: black;
  font-weight: 600;
  font-family: "Metropolis";
  outline: none !important;
  padding: 0.8em 2em;
  border: 1px solid black;
  margin-top: 2em;
  width: 100%;
  transition: all 0.2s ease;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const SidebarModal = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  return (
    <SideModal
      {...props}
      id="rightModal"
      aria-hidden="true"
      aria-labelledby="right-side-bar">
      <Modal.Header className="header" closeButton>
        <Modal.Title>CART</Modal.Title>
      </Modal.Header>
      <Modal.Header className="title">
        1 product was added to your cart
      </Modal.Header>
      <ModalBody className="show-grid">
        <Container>
          <Row className="body">
            <Col xs={6}>Total:</Col>
            <Col xs={6}>${cart.itemsPrice}</Col>
          </Row>
          <Row className="body">
            <Col xs={12}>Taxes are calculated at checkout</Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Link to="/cart">
                <CartButton>VIEW CART</CartButton>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ContinueButton onClick={props.onHide}>
                CONTINUE SHOPPING
              </ContinueButton>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </SideModal>
  );
};

export default SidebarModal;
