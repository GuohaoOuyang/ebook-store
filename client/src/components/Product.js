import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const StyledCard = styled(Card)`
  .link {
    text-decoration: none;
  }
  .title {
    min-height: 3em;
    color: ${(props) => props.theme.palette.lightblack};
    font-family: "Metropolis";
    font-size: 0.8em;
  }
  .price {
    color: ${(props) => props.theme.palette.lightblack};
    font-family: "Sentinel";
    font-size: 0.8em;
  }
  .card-body {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-top: 10px;
  }
`;
const Product = ({ product }) => {
  return (
    <StyledCard border="light" className="my-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link className="link" to={`/product/${product._id}`}>
          <Card.Title className="title" as="div">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="h3" className="price">
          MSRP <span>${product.price}</span>
        </Card.Text>
        <hr className="mt-1 mb-3" />
        <Card.Text as="h3" className="title">
          by {product.author}
        </Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default Product;
