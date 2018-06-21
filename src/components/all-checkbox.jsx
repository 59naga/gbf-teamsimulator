import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';
import { translate } from 'react-i18next';

class AllCheckbox extends React.Component {
  handleCheck() {
    const { query, type, value, dispatch } = this.props;

    const data = query[type] || '';
    const payload = { [type]: data.length ? '' : value };
    dispatch(push(`/?${stringify(Object.assign(query, payload))}`));
  }
  render() {
    const { query, type, label } = this.props;
    const data = query[type] || '';

    return (
      <label className="all-check" htmlFor={type}>
        <input
          id={type}
          type="checkbox"
          checked={data.length > 0}
          onChange={() => { this.handleCheck(); }}
        />
        <span>{this.props.t([`form.${label}`, label])}</span>
      </label>
    );
  }
}
AllCheckbox.propTypes = {
  label: PropTypes.string,
  query: PropTypes.shape(),
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
AllCheckbox.defaultProps = {
  label: 'All',
  query: {},
};

export default connect(state => state)(translate()(AllCheckbox));
