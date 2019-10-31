import React from "react";
import PropTypes from 'prop-types';

const Station = (name) => {
  return (
    <button>
      {name}
    </button>
  )
}

Station.propTypes = {
  //stationName: PropTypes.string.isRequired
}

export default Station;