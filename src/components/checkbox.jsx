import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';

import _xor from 'lodash.xor';

class Checkbox extends React.Component {
  handleCheck() {
    const { query, type, value } = this.props;
    const data = query[type] ? query[type].split(SEPARATOR) : [];

    const payload = { [type]: _xor(data, [value]).join(SEPARATOR) };
    this.props.dispatch(push(`/?${stringify(Object.assign(query, payload))}`));
  }
  render() {
    const { query, type, value } = this.props;
    const data = query[type] ? query[type].split(SEPARATOR) : [];

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
