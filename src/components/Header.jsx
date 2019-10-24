import React from "react";
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <button>
      Station
    </button>
  )
}

Header.propTypes = {
  center: PropTypes.exact({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })
}

export default Header;