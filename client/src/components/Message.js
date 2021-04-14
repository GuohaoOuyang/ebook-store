import React from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  width: 100vw;
  padding-left: 20vw;
  .head {
    font-family: "Sentinel";
    font-size: 1.2em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .children {
    font-family: "Metropolis";
    color: ${(props) => props.theme.palette.lightblack};
  }
`;

const StyledRow = styled(Row)`
  margin-top: 20px;
`;

const Message = ({ variant, head, children }) => {
  return (
    <StyledRow>
      <Col>
        <StyledAlert variant={variant}>
          <Container fluid="true">
            <Alert.Heading className="head">{head}</Alert.Heading>
            <p className="children">{children}</p>
          </Container>
        </StyledAlert>
      </Col>
    </StyledRow>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
