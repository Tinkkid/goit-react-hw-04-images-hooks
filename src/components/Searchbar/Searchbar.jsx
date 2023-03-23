import { Component } from 'react';
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

export class Searchbar extends Component {
  state = {
    query: '',
    images: [],
  };
  static propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Please enter your search query', {
        position: 'top-left',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: 'colored',
      });
    }
    this.props.onSubmit(this.state.query.trim().toLowerCase());
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchWrap>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <SearchLabel>Search</SearchLabel>
          </SearchBtn>

          <SearchInput
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
        {/* <Toaster /> */}
      </SearchWrap>
    );
  }
}
