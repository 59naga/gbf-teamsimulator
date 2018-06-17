import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AllCheckbox extends React.Component {
  handleCheck() {
    const { query, type, value } = this.props;
    const data = query[type] || '';

    this.props.dispatch({
      type: 'QUERY',
      payload: { [type]: data.length ? '' : value },
    });
  }
  render() {
    const { query, type } = this.props;
    const data = query[type] || '';

    return (
      <label htmlFor={type}>
        <input
          id={type}
          type="checkbox"
          checked={data.length > 0}
          onChange={() => { this.handleCheck(); }}
        />
        <span>All</span>
      </label>
    );
  }
}
AllCheckbox.propTypes = {
  query: PropTypes.shape({}),
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
AllCheckbox.defaultProps = {
  query: {},
};

export default connect(state => state)(AllCheckbox);
