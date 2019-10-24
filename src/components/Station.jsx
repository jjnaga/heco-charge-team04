import React from "react";
import PropTypes from 'prop-types';

const Station = () => {
  return (
    <button>
      hi
    </button>
  )
}

Station.propTypes = {
  center: PropTypes.exact({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })
}

export default Station;