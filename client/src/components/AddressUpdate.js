import React, { useState } from "react";
import { Form, Row, Col, Modal, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { saveShippingAddress } from "../actions/cartActions";

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
  .title {
    font-size: 1.1em;
    font-family: "Metropolis";
    padding-bottom: 1em;
  }
  .emailLabel {
    margin-bottom: 0;
    font-family: "Metropolis";
    color: rgb(118, 118, 118);
    font-size: 0.8em;
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

const StyledInput = styled.input`
  border: 1px solid #eaeaea;
  background-color: ${(props) => props.theme.palette.primary};
  width: 100%;
  padding-left: 0.8em;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: "Metropolis";
    font-size: 0.8em;
  }
`;

const AddressUpdate = (props) => {
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address));
    props.onHide();
  };

  return (
    <StyledModal {...props} centered>
      <Modal.Header className="header" closeButton>
        <Modal.Title>Enter a new shipping address</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className="title">
            <Col>Edit your address</Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <Form style={{ width: "100%" }} onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="emailLabel">Email</Form.Label>
                  <StyledInput
                    type="email"
                    placeholder="example@email.com"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}></StyledInput>
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

export default AddressUpdate;
