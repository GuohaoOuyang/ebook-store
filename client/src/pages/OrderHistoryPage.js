import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Order from "../components/Order";
import Loader from "../components/Loader";
import styled from "styled-components";
import { listMyOrders } from "../actions/orderActions";

const StyledRow = styled(Row)`
  padding-top: 80px;
  padding-bottom: 80px;
  hr {
    margin-bottom: 10px;
  }
  p {
    font-family: "Metropolis";
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.lightblack};
    margin-bottom: 10px;
    padding-left: 2em;
  }
`;

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
`;

const OrderHistoryPage = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <StyledRow>
      <Col md={12}>
        <hr />
        <p>
          <strong>My Orders</strong>
        </p>
        {loadingOrders ? (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            {orders.map((order) => (
              <Order order={order} />
            ))}
          </>
        )}
      </Col>
    </StyledRow>
  );
};

export default OrderHistoryPage;
