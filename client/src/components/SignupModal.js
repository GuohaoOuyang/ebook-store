import React, { useState, useEffect } from "react";
import { Form, Row, Col, Modal, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import styled from "styled-components";
import leftbook from "../utils/images/leftbooks2.jpeg";
import { checkEmail } from "../actions/userActions";
import { useHistory } from "react-router-dom";

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
  .emailLabel {
    margin-bottom: 0;
    font-family: "Metropolis";
    font-size: 0.8em;
    color: rgb(118, 118, 118);
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
  :hover {
    background-color: black;
  }
`;

const StyledLink = styled.button`
  color: ${(props) => props.theme.palette.lightblack};
  text-decoration: underline;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
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

const SignupModal = (props) => {
  const [email, setEmail] = useState("");

  const { handleSignIn, ...rest } = props;

  let history = useHistory();

  const dispatch = useDispatch();

  const userCheck = useSelector((state) => state.userCheck);
  const { loading, error, checkedEmail } = userCheck;

  const signInTransition = () => {
    handleSignIn();
    rest.onHide();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(checkEmail(email));
  };

  useEffect(() => {
    if (checkedEmail) {
      rest.onHide();
      history.push(`/register/${checkedEmail}`);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedEmail]);

  return (
    <StyledModal {...rest} size="lg" centered>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} className="pl-0 pr-0">
              <img className="leftImage" src={leftbook} alt="modal-left-book" />
            </Col>
            <Col
              xs={6}
              className="pl-0 pr-0 d-flex flex-column align-items-center justify-content-center">
              <h2>Nice to meet you</h2>
              <p>Sign up to start shopping books today!</p>
              <Form style={{ width: "80%" }} onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label className="emailLabel">Email Address</Form.Label>
                  <StyledInput
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></StyledInput>
                </Form.Group>
                {loading ? (
                  <StyledButton type="submit" variant="primary">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </StyledButton>
                ) : (
                  <StyledButton type="submit" variant="primary">
                    Get Started
                  </StyledButton>
                )}
                {error && <Snackbar show={true}>{error}</Snackbar>}
              </Form>
              <p className="my-4">
                Already has an account?{""}
                <StyledLink onClick={signInTransition}>Sign In</StyledLink>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </StyledModal>
  );
};

export default SignupModal;
