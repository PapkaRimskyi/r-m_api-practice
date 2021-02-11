import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../../../../img/loading-failed.png';

export default function Error({ errMessage }) {
  useEffect(() => {
    alert(errMessage);
  }, []);

  return (
    <figure>
      <img src="assets/img/loading-failed.png" alt="Loading failed" />
    </figure>
  );
}

Error.propTypes = {
  errMessage: PropTypes.string.isRequired,
};
