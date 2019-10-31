import React from "react";
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {


    return (
      <div className="header">
        <h1>HECO</h1>
      </div>
    )
  }
}

Header.propTypes = {
  center: PropTypes.exact({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })
}


export default Header;