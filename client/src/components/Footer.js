import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  font-family: "Metropolis";
  color: ${(props) => props.theme.palette.lightblack};
  font-size: 0.8em;
  margin-left: 20vw;
`;
const Footer = () => {
  return (
    <footer>
      <StyledContainer fluid="true">
        <Row>
          <Col className="py-3">
            &copy; 2021 Fair, Inc. All rights reserved.
          </Col>
        </Row>
      </StyledContainer>
    </footer>
  );
};

export default Footer;
