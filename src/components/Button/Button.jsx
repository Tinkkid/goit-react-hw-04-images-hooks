import PropTypes from 'prop-types';
import { SearchBtn } from '../Button/Button.styled';

export const Button = ({ onClick }) => {
  return (
    <SearchBtn type="button" onClick={onClick}>
      Load more
    </SearchBtn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
