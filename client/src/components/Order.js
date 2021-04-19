import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  border-color: rgba(0, 0, 0, 0.1);
  margin: 0 !important;
  .leftSide {
    padding-left: 2em;
  }
  .orderId {
    font-family: "Metropolis";
    margin-bottom: 1em;
    font-size: 1em;
    color: black;
  }
  .details {
    font-family: "Metropolis";
    font-size: 0.8em;
    color: black;
  }
  .details-up {
    padding-bottom: 0.5em;
  }
`;

const StyledViewDetail = styled.button`
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
const Order = ({ order }) => {
  function formatDate(date) {
    let currentDate = new Date(date);
    var darray = currentDate.toDateString().split(" ");
    return `${darray[1]} ${darray[2]}, ${darray[3]}`;
  }
  return (
    <StyledCard className="my-3">
      <Card.Body>
        <Row className="leftSide">
          <Col className="orderId" xs={10}>
            <strong>Order #</strong> {order._id}
          </Col>
          <Col xs={2}>
            <Link to={`/order/${order._id}`}>
              <StyledViewDetail>View order details</StyledViewDetail>
            </Link>
          </Col>
        </Row>
        <Row className="leftSide">
          <Col className="details">
            <Row>
              <Col className="details-up">
                <strong>Date Ordered</strong>
              </Col>
            </Row>
            <Row>
              <Col>{formatDate(order.createdAt)}</Col>
            </Row>
          </Col>
          <Col className="details">
            <Row>
              <Col className="details-up">
                <strong>Total</strong>
              </Col>
            </Row>
            <Row>
              <Col>${order.totalPrice}</Col>
            </Row>
          </Col>
          <Col className="details">
            <Row>
              <Col className="details-up">
                <strong>Order Status</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                {!order.isPaid
                  ? "waiting to pay"
                  : !order.isDelivered
                  ? "waiting to ship"
                  : "success delivered"}
              </Col>
            </Row>
          </Col>
          <Col className="details">
            <Row>
              <Col className="details-up">
                <strong>Ship Date</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                {!order.isPaid
                  ? "waiting to pay"
                  : order.isDelivered
                  ? formatDate(order.deliveredAt)
                  : "waiting to ship"}
              </Col>
            </Row>
          </Col>
          <Col className="details">
            <Row>
              <Col className="details-up">
                <strong>Payment Status</strong>
              </Col>
            </Row>
            <Row>
              <Col>{order.isPaid ? "success" : "waiting to pay"}</Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </StyledCard>
  );
};

export default Order;
