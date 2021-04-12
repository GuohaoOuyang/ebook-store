import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { SearchIcon } from "react-line-awesome";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: row;
  border: 1px solid #eaeaea;
  padding: 2px;
  width: 30%;
`;

const StyledInput = styled.input`
  flex-grow: 2;
  border: none;
  background-color: ${(props) => props.theme.palette.primary};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: "Metropolis";
    font-size: 0.8em;
  }
`;

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <StyledForm onSubmit={submitHandler} className="mr-auto searchbox">
      <StyledInput
        // type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for a book name"
      />
      <StyledButton>
        <SearchIcon />
      </StyledButton>
    </StyledForm>
  );
};

export default SearchBox;
