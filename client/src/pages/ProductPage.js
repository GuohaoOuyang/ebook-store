import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Collapse, Spinner } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listProductDetails } from "../actions/productActions";
import styled from "styled-components";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import SidebarModal from "../components/SidebarModal";
import { addToCart } from "../actions/cartActions";

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-left: 20vw;
  margin-right: 20vw;
  padding-top: 180px;
  padding-bottom: 180px;
  .title {
    font-family: "Sentinel";
    font-size: 1.3em;
    color: ${(props) => props.theme.palette.lightblack};
  }
  .collapsed {
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.palette.lightblack};
    text-decoration: underline;
    padding: 0;
    margin: 0;
    font-family: "Sentinel";
    font-size: 0.8em;
    &:focus {
      outline: none;
    }
  }
  .collapsed[aria-expanded="false"]:after {
    content: "Show More";
  }
  .collapsed[aria-expanded="true"]:after {
    content: "Show Less";
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
  transition: all 0.2s ease;
  &:hover {
    background-color: black;
  }
`;

const CustomedRow = styled(Row)`
  font-family: "Metropolis";
  font-size: 0.8em;
  margin-top: 2em;
  color: ${(props) => props.theme.palette.lightblack};
  .desbox:not(.show) {
    height: 4.5em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const cart = useSelector((state) => state.cart);
  const { loading: loadingCart } = cart;

  const [open, setOpen] = useState(false);

  const [cartModal, setCartModal] = useState(false);

  const qty = 1;

  useEffect(() => {
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    setCartModal(true);
  };

  return (
    <>
      <ScrollToTopOnMount />
      {loading ? (
        <StyledLoader>
          <Loader />
        </StyledLoader>
      ) : error ? (
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <Message variant="danger" head="oops">
              seems like a connection issue
            </Message>
          </Col>
        </Row>
      ) : (
        <>
          <Meta title={product.name} />
          <StyledRow>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0">
                  <h3 className="title">
                    <strong>{product.name}</strong>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <p className="author">
                    by <strong>{product.author}</strong>
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <p className="author">${product.price}</p>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  {loadingCart ? (
                    <StyledButton
                      className="btn-block"
                      type="button"
                      data-toggle="modal"
                      data-target="#rightModal"
                      onClick={addToCartHandler}>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </StyledButton>
                  ) : (
                    <StyledButton
                      className="btn-block"
                      type="button"
                      data-toggle="modal"
                      data-target="#rightModal"
                      onClick={addToCartHandler}>
                      Add To Cart
                    </StyledButton>
                  )}
                  <SidebarModal
                    show={cartModal}
                    onHide={() => setCartModal(false)}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <CustomedRow>
                    <Collapse in={open}>
                      <Col
                        className="desbox"
                        id="collapse-description"
                        aria-expanded={open}>
                        <strong>About: </strong>
                        {product.description}
                      </Col>
                    </Collapse>
                  </CustomedRow>

                  <button
                    onClick={() => setOpen(!open)}
                    className="collapsed"
                    aria-expanded={open}
                    aria-controls="collapse-description"></button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </StyledRow>
        </>
      )}
    </>
  );
};

export default ProductPage;
