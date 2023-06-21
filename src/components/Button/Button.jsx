import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled.js';

export const Button = ({ onClick }) => (
  <StyledButton type="button" onClick={onClick}>
    Load More
  </StyledButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};