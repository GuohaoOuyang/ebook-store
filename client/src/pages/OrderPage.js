import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import styled from "styled-components";
import Snackbar from "../components/Snackbar";
import { CheckCircleIcon } from "react-line-awesome";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const StyledRow = styled(Row)`
  margin-left: 20vw;
  margin-right: 20vw;
  padding-top: 120px;
  padding-bottom: 80px;
  color: ${(props) => props.theme.palette.lightblack};

  p {
    font-family: "Metropolis"
    font-size: 0.8em;
    color:  ${(props) => props.theme.palette.lightblack};
  }

  .leftside {
    padding: 0;
  }

  .alertTitle {
    background-color: rgb(247, 248, 251);
    font-family: "Big Caslon";
    font-size: 1.2em;
  }

  .card {
    border: none;
  }

  .summaryRow {
    font-family: "Metropolis";
    font-size: 1em;
    background-color: rgb(247, 248, 251);
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
`;

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
`;

const PaidBadge = styled(Alert)`
  margin-top: 2em;
  margin-bottom: 2em;
  border: none;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(247, 248, 251);
  color: rgb(62, 98, 8);
  font-family: "Sentinel";
`;

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`/apiUrl/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (successPay) {
      history.push(`/order/${order._id}/success`);
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <StyledLoader>
      <Loader />
    </StyledLoader>
  ) : loadingPay ? (
    <StyledLoader>
      <Loader />
    </StyledLoader>
  ) : error ? (
    <Snackbar show={true}>{error}</Snackbar>
  ) : (
    <>
      <StyledRow>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 leftside">
              <Alert className="alertTitle">
                <Row>
                  <Col>Shipping Address</Col>
                </Row>
              </Alert>
              <Alert variant="light">
                <p>{order.shippingAddress} </p>{" "}
              </Alert>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 leftside">
              <Alert className="alertTitle">Review Open Orders</Alert>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={8}>
                        <Row className="title">{item.name}</Row>
                        <Row className="title">By Aidan</Row>
                      </Col>
                      <Col md={2} className="price">
                        ${item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="card">
            <ListGroup variant="flush">
              <ListGroup.Item className="alertTitle text-center border-0">
                Order Summary
              </ListGroup.Item>
              <ListGroup.Item className="border-0 summaryRow">
                <Row>
                  <Col>Subtotal</Col>
                  <Col className="d-flex justify-content-end">
                    ${order.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="summaryRow">
                <Row>
                  <Col>Tax</Col>
                  <Col className="d-flex justify-content-end">
                    ${order.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="summaryRow border-0">
                <Row>
                  <Col>Total</Col>
                  <Col className="d-flex justify-content-end">
                    ${order.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item className="summaryRow border-0">
                  {!sdkReady ? (
                    <StyledLoader>
                      <Loader />
                    </StyledLoader>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && (
                <StyledLoader>
                  <Loader />
                </StyledLoader>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="summaryRow border-0">
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
          {order.isPaid && (
            <PaidBadge>
              <CheckCircleIcon className="la-lg" />
              <strong>Order Paid!</strong>
            </PaidBadge>
          )}
          {order.isDelivered && (
            <PaidBadge>
              <CheckCircleIcon className="la-lg" />
              <strong>Order Delivered!</strong>
            </PaidBadge>
          )}
        </Col>
      </StyledRow>
    </>
  );
};

export default OrderPage;
