// More general engine is required to replay actions but this is just a Proof-of-concept

import React, { PropTypes } from 'react';
import { FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import FaCheckmark from 'react-icons/lib/fa/check';
import FaEraser from 'react-icons/lib/fa/eraser';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaSpin from 'react-icons/lib/fa/spinner';
import { requestClear, requestReplay } from '../../../../redux/actions/request';

const propTypes = {
  description: PropTypes.node.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  dispatch: PropTypes.func,
};

function RequestRow({
  description,
  dispatch,
  id,
  timestamp,
  status,
}) {
  function clearRow() {
    dispatch(requestClear(description));
  }

  function replay() {
    dispatch(requestReplay(description));
  }

  function showMessage() {
    const msg = description.replace(/\[url="(.*?)"](.*?)\[\/url]/, '$2');

    if (msg.length > 100) {
      return `${msg.slice(0, 97)}...`;
    }

    return msg;
  }

  return (
    <li>
      <span className="request-row-description">
        <Link to={`/#like-${id}`}>
          {showMessage()}
        </Link>
      </span>
      <span className="request-right-block">
        <span className="request-row-time">
          {status === 0 && <FormattedRelative value={timestamp} updateInterval={1000} />}
        </span>
        <span className="request-row-buttons">
          {status === 0 && <FaSpin className={classnames('faa-spin', 'animated')} />}
          {status === 1 && <FaCheckmark />}
          {status === 2 && <Button title="replay" onClick={replay}><FaRefresh /></Button>}
          {status !== 0 && <Button onClick={clearRow} title="clear"><FaEraser /></Button>}
        </span>
      </span>
    </li>
  );
}

RequestRow.propTypes = propTypes;

export default connect()(RequestRow);
