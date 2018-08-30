import PropTypes from 'prop-types';

export default PropTypes.shape({
  isSubmitted: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});
