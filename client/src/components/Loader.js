import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const StyledLoader = styled(Spinner)`
  font-size: 0.5em;
`;

const Loader = () => {
  return <StyledLoader animation="border" role="status"></StyledLoader>;
};

export default Loader;
