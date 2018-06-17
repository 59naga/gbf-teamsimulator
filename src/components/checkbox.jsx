import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _xor from 'lodash.xor';

class Checkbox extends React.Component {
  handleCheck() {
    const { query, type, value } = this.props;
    const data = query[type] ? query[type].split(',') : [];

    this.props.dispatch({
      type: 'QUERY',
      payload: { [type]: _xor(data, [value]).join(',') },
    });
  }
  render() {
    const { query, type, value } = this.props;
    const data = query[type] ? query[type].split(',') : [];

    const componentName = `${type}_${value}`;
    return (
      <label htmlFor={componentName}>
        <input
          id={componentName}
          type="checkbox"
          checked={data.indexOf(value) !== -1}
          onChange={() => { this.handleCheck(); }}
        />
        <span>{value}</span>
      </label>
    );
  }
}
Checkbox.propTypes = {
  query: PropTypes.shape({}),
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
Checkbox.defaultProps = {
  query: {},
};

export default connect(state => state)(Checkbox);
