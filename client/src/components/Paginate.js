import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

const StyledPaginate = styled(Pagination)`
  margin: 0;
  .page-item.active .page-link {
    background-color: ${(props) => props.theme.palette.lightblack};
    color: white;
    font-family: "Metropolis";
  }
  .page-item {
    margin: 0.8em;
  }
  .page-link {
    border: none;
    color: black;
    border-radius: 10%;
    &:hover {
      background-color: transparent;
    }
  }
`;

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <StyledPaginate className="justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }>
            <Pagination.Item className="shadow-none " active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </StyledPaginate>
    )
  );
};

export default Paginate;
