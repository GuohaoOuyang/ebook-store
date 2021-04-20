import React, { useState, useEffect } from "react";
import { Form, Row, Col, Modal, Container } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const StyledModal = styled(Modal)`
  .modal-content {
    padding-bottom: 2em;
    border-radius: 0;
    border: none;
  }
  .header {
    border: none;
    font-family: "Sentinel";
    // padding: 0.4em 1em;
    background-color: rgb(247, 248, 251);
    color: ${(props) => props.theme.palette.lightblack};
    .h4 {
      font-size: 1em;
    }
    .close {
      &:focus {
        outline: none;
      }
    }
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.palette.secondary};
  font-size: 1em;
  color: white;
  font-family: "Metropolis";
  border: none;
  outline: none;
  padding: 0.4em 2em;
  margin-top: 1em;
  width: 100%;
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
    right: -0.4em;
    transition: 0.5s;
  }
  :hover span {
    transform: translate3d(-0.5em, 0, 0);
  }
  :hover span: after {
    opacity: 1;
    right: -0.8em;
  }
`;

const AdminUpdate = (props) => {
  const { userId, admin, ...rest } = props;
  const [isAdmin, setIsAdmin] = useState(admin);

  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      props.onHide();
    }
  }, [success, dispatch, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, isAdmin }));
  };

  return (
    <StyledModal {...rest} centered>
      <Modal.Header className="header" closeButton>
        <Modal.Title>Update admin status</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <Form style={{ width: "100%" }} onSubmit={submitHandler}>
                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
                <StyledButton type="submit">
                  <span>Save</span>
                </StyledButton>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </StyledModal>
  );
};

export default AdminUpdate;
