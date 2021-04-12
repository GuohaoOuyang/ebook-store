import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductBanner from "../components/ProductBanner";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import styled from "styled-components";

const StyledResult = styled.div`
  padding-left: 20vw;
  font-family: "Sentinel";
  font-size: 1.2em;
  margin-top: 4em;
`;

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-left: 20vw;
  margin-right: 20vw;
  .padding-0 {
    padding-left: 0;
    padding-right: 5rem;
  }
`;

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductBanner />
      ) : (
        <StyledResult>Search Results for {keyword}</StyledResult>
      )}
      <Container fluid="true">
        {loading ? (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length > 0 ? (
          <>
            <StyledRow>
              {products.map((product) => (
                <Col
                  key={product._id}
                  className="padding-0"
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </StyledRow>
            <div>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </>
        ) : (
          <Message variant="warning" head="No results">
            We couldn’t find exact matches for {keyword}. Try searching other
            keywords
          </Message>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
