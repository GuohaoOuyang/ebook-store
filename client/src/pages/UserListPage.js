import React, { useEffect, useState } from "react";
import { Table, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import styled from "styled-components";
import AdminUpdate from "../components/AdminUpdate";

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

const UserListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const [adminUpdated, setAdminUpdate] = useState(false);

  const [userid, setUserID] = useState();
  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else if (success) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };
  const adminHandler = (id, admin) => {
    setAdminUpdate(true);
    setUserAdmin(admin);
    setUserID(id);
  };

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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              <AdminUpdate
                show={adminUpdated}
                onHide={() => setAdminUpdate(false)}
                userId={userid}
                admin={userAdmin}
              />
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="align-items-center">{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => adminHandler(user._id, user.isAdmin)}>
                      <i className="fas fa-edit"></i>
                    </Button>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
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

export default UserListPage;
