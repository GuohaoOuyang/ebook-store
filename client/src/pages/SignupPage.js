import React, { useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  FormControl,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import styled from "styled-components";
import Snackbar from "../components/Snackbar";
import { Formik } from "formik";
import * as yup from "yup";

const StyledContainer = styled(Container)`
  .totalHeight {
    height: 800px;
  }
  h2 {
    text-align: center;
    color: ${(props) => props.theme.palette.lightblack};
    font-family: "Sentinel";
  }
  p {
    text-align: center;
    color: ${(props) => props.theme.palette.lightblack};
    font-family: "Metropolis";
  }
`;

const StyledInput = styled(FormControl)`
  border: 1px solid rgb(204, 204, 204);
  background-color: ${(props) => props.theme.palette.primary};
  width: 100%;
  padding-left: 0.8em;
  border-radius: 0;
  &:focus {
    outline: none !important;
    border-color: rgb(170, 170, 170);
    box-shadow: none;
  }
  &::placeholder {
    font-family: "Metropolis";
    font-size: 0.8em;
  }
`;

const StyledError = styled.div`
  color: rgb(235, 102, 102);
  font-family: "Metropolis";
  font-size: 0.8em;
`;

const StyledLabel = styled(FormLabel)`
  color: ${(props) => props.theme.palette.lightblack};
  font-family: "Metropolis";
  font-size: 0.8em;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.palette.lightblack};
  font-size: 0.8em;
  color: white;
  font-family: "Metropolis";
  border-style: none;
  outline: none !important;
  padding: 0.7em 2em;
  margin-top: 1em;
  width: 100%;
  &:hover {
    background-color: black;
  }
`;

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Must be more than two characters long")
    .required("Must be filled out"),
  lastName: yup
    .string()
    .min(2, "Must be more than two characters long")
    .required("Must be filled out"),
  password: yup
    .string()
    .min(6, "Must be more than six characters long")
    .required("Must be filled out"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Must be filled out"),
});

const RegisterScreen = ({ location, history, match }) => {
  const dispatch = useDispatch();

  const checkedEmail = match.params.email;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <StyledContainer>
      <Row className="totalHeight d-flex flex-cloumn justify-content-md-center align-items-md-center">
        <Col xs={12} md={4}>
          <Row>
            <Col>
              <h2>Welcome!</h2>
              <p>Let's start with some basic info</p>
            </Col>
          </Row>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              dispatch(
                register(
                  values.firstName,
                  values.lastName,
                  checkedEmail,
                  values.password
                )
              );
            }}
            initialValues={{
              firstName: "",
              lastName: "",
              password: "",
              confirmPassword: "",
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                  <StyledLabel>First Name</StyledLabel>
                  <StyledInput
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName ? (
                    <StyledError>{errors.firstName}</StyledError>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="lastName">
                  <StyledLabel>Last Name</StyledLabel>
                  <StyledInput
                    type="text"
                    name="lastName"
                    placeholder="Enter email"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.lastName && errors.lastName ? (
                    <StyledError>{errors.lastName}</StyledError>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="password">
                  <StyledLabel>Password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password ? (
                    <StyledError>{errors.password}</StyledError>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <StyledLabel>Confirm Password</StyledLabel>
                  <StyledInput
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <StyledError>{errors.confirmPassword}</StyledError>
                  ) : null}
                </Form.Group>
                {loading ? (
                  <StyledButton type="submit">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </StyledButton>
                ) : (
                  <StyledButton type="submit">Next</StyledButton>
                )}

                {error && <Snackbar show={true}>{error}</Snackbar>}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default RegisterScreen;
