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
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import SigninModal from "../components/SigninModal";
import UpdateEmailModal from "../components/UpdateEmailModal";
import styled from "styled-components";
import { saveShippingAddress } from "../actions/cartActions";

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

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const [emailUpdated, setEmailUpdated] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // if (userInfo) {
    //   dispatch(saveShippingAddress(userInfo.email));
    // }
  }, [dispatch, productId, qty, shippingAddress]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      history.push("/shipping");
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

  // const placeOrderHandler = () => {
  //   dispatch(
  //     createOrder({
  //       orderItems: cart.cartItems,
  //       shippingAddress: cart.shippingAddress,
  //       paymentMethod: cart.paymentMethod,
  //       itemsPrice: cart.itemsPrice,
  //       taxPrice: cart.taxPrice,
  //       totalPrice: cart.totalPrice,
  //     })
  //   )
  // }

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
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col className="pic" md={2}>
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
                </ListGroup.Item>
              </ListGroup>
            </StyledCard>
            {userInfo && (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-0">
                    <Alert variant="secondary">
                      <p>Shipping {cartItems.length} Items to this Address</p>
                      {shippingAddress &&
                      Object.keys(shippingAddress).length > 0
                        ? shippingAddress
                        : null}
                    </Alert>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-0">
                    <CheckoutButton
                      type="button"
                      className="btn-block"
                      onClick={() => setEmailUpdated(true)}>
                      Update the Address
                    </CheckoutButton>
                    <UpdateEmailModal
                      show={emailUpdated}
                      onHide={() => setEmailUpdated(false)}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
          </Col>
        </>
      )}
    </StyledRow>
  );
};

export default CartScreen;
