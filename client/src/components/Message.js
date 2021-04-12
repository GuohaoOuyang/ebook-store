import React from "react";
import { Alert, Container } from "react-bootstrap";
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

const Message = ({ variant, head, children }) => {
  return (
    <StyledAlert variant={variant}>
      <Container fluid="true">
        <Alert.Heading className="head">{head}</Alert.Heading>
        <p className="children">{children}</p>
        {/* {children.map((c, index) => (
          <p className="children" key={index}>
            {c}
          </p>
        ))} */}
      </Container>
    </StyledAlert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
