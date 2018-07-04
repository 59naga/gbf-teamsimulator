// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';
import { translate } from 'react-i18next';

import _xor from 'lodash.xor';

import { CheckboxContainer, CheckboxInput } from './_styles'

type Props = {
  query: {},
  t: Function,
  type: string,
  value: string,
  dispatch: Function,
};

class Component extends React.Component<Props> {
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
        <CheckboxInput
          id={componentName}
          checked={data.indexOf(value) !== -1}
          onChange={() => {
            this.handleCheck();
          }}
        />
        <span>{t([`form.${value}`, value])}</span>
      </CheckboxContainer>
    );
  }
}

export default connect(state => state)(translate()(Component));
