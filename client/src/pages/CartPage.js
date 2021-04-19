import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Alert,
  Card,
  Container,
} from "react-bootstrap";
import { removeFromCart } from "../actions/cartActions";
import SigninModal from "../components/SigninModal";
import AddressUpdate from "../components/AddressUpdate";
import styled from "styled-components";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Snackbar from "../components/Snackbar";

const StyledRow = styled(Row)`
  margin-left: 20vw;
  margin-right: 20vw;
  padding-top: 180px;
  padding-bottom: 80px;
  h1 {
    font-family: "Big Caslon";
    font-size: 2em;
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  h3 {
    font-family: "Metropolis";
    font-size: 1.5em;
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .alert {
    padding: 5px 5px;
    background-color: rgb(247, 248, 251);
    margin: 0;
  }
  .title {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: ${(props) => props.theme.palette.lightblack};
    margin-bottom: 1em;
  }
  .price {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .summaryRow {
    font-family: "Metropolis";
    font-size: 1em;
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
`;

const StyledCard = styled(Card)`
  border: none;
  background-color: transparent;
`;

const CheckoutButton = styled.button`
  background-color: ${(props) => props.theme.palette.secondary};
  font-size: 1em;
  color: white;
  font-family: "Metropolis";
  border-style: none;
  outline: none !important;
  padding: 0.4em 2em;
  margin-top: 1em;
  width: 100%;
`;

const ChangeButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.palette.lightblack};
  text-decoration: underline;
  padding: 0;
  margin: 0;
  font-family: "Sentinel";
  font-size: 0.8em;
  &:focus {
    outline: none;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.palette.lightblack};
  text-decoration: underline;
  padding: 0;
  margin: 0;
  font-size: 1em;
  font-family: "Sentinel";
  &:hover {
    text-decoration: none;
  }
  &:focus {
    outline: none;
  }
`;

const StyledEmail = styled(Alert)`
  border: none;
  font-family: "Metropolis";
  font-size: 1em;
`;

const CartPage = ({ history }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const [emailUpdated, setEmailUpdated] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, history, order]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
    } else {
      setModalShow(true);
    }
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.taxPrice = addDecimals(Number((0.13 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  return (
    <StyledRow>
      {cartItems.length === 0 ? (
        <>
          <Container>
            <Row className="justify-content-md-center">
              <h1>Your Shopping Cart is Empty</h1>
            </Row>
            <Row className="justify-content-md-center">
              <Link to="/">
                <StyledButton>Continue Shopping</StyledButton>
              </Link>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Col md={8}>
            <h1>{userInfo ? userInfo.name + "'s" : "Your"} Shopping Cart</h1>
            {userInfo && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0 alert">
                    <StyledEmail>
                      <Row>
                        <Col>
                          <p>
                            Shipping {cartItems.length} Items to this Address
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={8}>
                          {shippingAddress &&
                          Object.keys(shippingAddress).length > 0
                            ? shippingAddress
                            : null}
                        </Col>
                        <Col xs={4}>
                          <ChangeButton
                            type="button"
                            className="btn-block"
                            onClick={() => setEmailUpdated(true)}>
                            Change
                          </ChangeButton>
                        </Col>
                      </Row>
                    </StyledEmail>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <AddressUpdate
                      show={emailUpdated}
                      onHide={() => setEmailUpdated(false)}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Link className="title" to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Row>
                      <Row className="title">By Aidan</Row>
                    </Col>
                    <Col
                      md={4}
                      className="price d-flex flex-column justify-content-between align-items-center">
                      <div>${item.price}</div>
                      <div>
                        <RemoveButton
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}>
                          remove
                        </RemoveButton>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <StyledCard border="light" bg="primary">
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 ">
                  <h3>Order Summary</h3>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Row className="summaryRow">
                    <Col>Subtotal</Col>
                    <Col className="d-flex justify-content-end">
                      $ {cart.itemsPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="summaryRow">
                    <Col>Tax</Col>
                    <Col className="d-flex justify-content-end">
                      $ {cart.taxPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Row className="summaryRow">
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <strong>$ {cart.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <CheckoutButton
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler()}>
                    Proceed To Checkout
                  </CheckoutButton>
                  <SigninModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  {error && <Snackbar show={true}>{error}</Snackbar>}
                </ListGroup.Item>
              </ListGroup>
            </StyledCard>
          </Col>
        </>
      )}
    </StyledRow>
  );
};

export default CartPage;
