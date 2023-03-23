import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  SearchWrap,
  SearchBtn,
  SearchForm,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = event => setQuery(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('Please enter your search query', {
        position: 'top-left',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'colored',
      });
    }
    onSubmit(query.trim().toLowerCase());
    setQuery('');
  };

  return (
    <SearchWrap>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchBtn>

        <SearchInput
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
      {/* <Toaster /> */}
    </SearchWrap>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
