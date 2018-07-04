import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';
import { translate } from 'react-i18next';

import _xor from 'lodash.xor';

import { CheckboxContainer } from './_styles';

class Checkbox extends React.Component {
  handleCheck() {
    const { query, type, value } = this.props;
    const data = query[type] ? query[type].split(SEPARATOR) : [];

    const payload = { [type]: _xor(data, [value]).join(SEPARATOR) };
    this.props.dispatch(push(`/?${stringify(Object.assign(query, payload))}`));
  }
  render() {
    const { t, query, type, value } = this.props;
    const data = query[type] ? query[type].split(SEPARATOR) : [];

    const componentName = `${type}_${value}`;
    return (
      <CheckboxContainer htmlFor={componentName}>
        <input
          id={componentName}
          type="checkbox"
          checked={data.indexOf(value) !== -1}
          onChange={() => { this.handleCheck(); }}
        />
        <span>{t([`form.${value}`, value])}</span>
      </CheckboxContainer>
    );
  }
}
Checkbox.propTypes = {
  query: PropTypes.shape(),
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
Checkbox.defaultProps = {
  query: {},
};

export default connect(state => state)(translate()(Checkbox));
