import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Modal, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import Loader from "./Loader";
import { login } from "../actions/userActions";
import styled from "styled-components";
import leftbook from "../utils/images/leftbooks.jpeg";

const StyledModal = styled(Modal)`
  .show-grid {
    padding: 0;
  }
  .leftImage {
    max-width: 100%;
  }
  h2 {
    font-family: "Sentinel";
    font-size: 1.3em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  p {
    font-family: "Metropolis";
    font-size: 0.7em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .link {
    color: ${(props) => props.theme.palette.lightblack};
    text-decoration: underline;
  }
`;

const StyledButton = styled.button`
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

const SigninModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      props.onHide();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <StyledModal {...props} size="lg" centered>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} className="pl-0 pr-0">
              <img className="leftImage" src={leftbook} alt="modal-left-book" />
            </Col>
            <Col
              xs={6}
              className="pl-0 pr-0 d-flex flex-column align-items-center justify-content-center">
              <h2>Welcome back!</h2>
              <p>Thousands of books await</p>
              {loading && <Loader />}
              <Form style={{ width: "80%" }} onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <StyledInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></StyledInput>
                </Form.Group>
                <Form.Group controlId="password">
                  <StyledInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></StyledInput>
                </Form.Group>
                <StyledButton type="submit" variant="primary">
                  Continue
                </StyledButton>
                {error && <Snackbar show={true}>{error}</Snackbar>}
              </Form>
              <p className="my-4">
                New to Fair?{" "}
                <Link to={"/register"} onClick={props.onHide} className="link">
                  Create an Account
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </StyledModal>
  );
};

export default SigninModal;
