import React from "react";
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi'
import {
    SearchButton,
    StyledForm,
    Input,
    SearchbarStyle,
  } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target.elements.search.value);
  };

  return (
    <SearchbarStyle>
      <StyledForm  onSubmit={handleSubmit}>
        <SearchButton type="submit" > <BiSearch size={'80%'} color={'#0099ff'}>
            </BiSearch>
         
        </SearchButton>
        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </StyledForm>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  