// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { stringify } from 'querystring';
import { translate } from 'react-i18next';

import { CheckboxContainer, CheckboxInput } from './_styles';

type Props = {
  t: Function,
  type: string,
  value: string,
  dispatch: Function,
  label: string,
  query: {},
};

class Component extends React.Component<Props> {
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
      <CheckboxContainer primary className="all-check" htmlFor={type}>
        <CheckboxInput
          id={type}
          checked={data.length > 0}
          onChange={() => {
            this.handleCheck();
          }}
        />
        <span>{this.props.t([`form.${label}`, label])}</span>
      </CheckboxContainer>
    );
  }
}

export default connect(state => state)(translate()(Component));
