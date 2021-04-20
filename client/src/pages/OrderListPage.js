import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import styled from "styled-components";

const StyledRow = styled(Row)`
  padding-top: 5em;
  font-family: "Metropolis" !important;
  .table-responsive {
    margin-left: 10em;
    margin-right: 10em;
  }
`;

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <StyledRow>
        {loading ? (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        ) : error ? (
          <Message variant="danger" head="oops">
            seems like a connection issue
          </Message>
        ) : (
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>User FirstName</th>
                <th>User LastName</th>
                <th>Total</th>
                <th>paid</th>
                <th>Delivered</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.firstName}</td>
                  <td>{order.user && order.user.lastName}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </StyledRow>
    </>
  );
};

export default OrderListPage;
