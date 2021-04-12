import React, { useState, useEffect } from "react";
import { Toast, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledToast = styled(Toast)`
  background-color: #ffcc00;
  color: ${(props) => props.theme.palette.lightblack};
  font-family: "Metropolis";
  font-size: "0.8em";
`;

const Snackbar = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.show) {
      setShow(true);
    }
  }, [props.show]);
  return (
    <Row>
      <Col>
        <StyledToast
          onClose={() => setShow(false)}
          delay={3000}
          autohide
          show={show}
          className="mt-1">
          <Toast.Body>{props.children}</Toast.Body>
        </StyledToast>
      </Col>
    </Row>
  );
};

export default Snackbar;
