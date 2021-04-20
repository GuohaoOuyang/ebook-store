import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import styled from "styled-components";

const StyledRow = styled(Row)`
  padding-top: 5em;
  font-family: "Metropolis" !important;
  .table-responsive {
    margin-left: 10em;
    margin-right: 10em;
  }
  .pagination {
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledLoader = styled.div`
  margin-top: 20%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

const ProductListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <StyledRow>
        {errorDelete && (
          <Message variant="danger" head="oops">
            delete product error
          </Message>
        )}
        {errorCreate && (
          <Message variant="danger" head="oops">
            create product error
          </Message>
        )}
        {loading ? (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        ) : error ? (
          <Message variant="danger" head="oops">
            seems like a connection issue
          </Message>
        ) : (
          <>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>
                    <Button onClick={createProductHandler} className="btn-sm">
                      Create Product
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.author}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </StyledRow>
    </>
  );
};

export default ProductListPage;
