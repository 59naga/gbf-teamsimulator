import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { translate } from 'react-i18next';

import styled from 'styled-components';

import { elements, weapons, rarities, races, styles } from '../defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';

class Form extends React.Component {
  handleReset() {
    this.props.dispatch(push('/'));
  }
  render() {
    const { t, label } = this.props;
    return (
      <form>
        <Inputs>
          <li>
            <AllCheckbox label="Rarity" type="rarity" value={rarities.join(SEPARATOR)} />
            {rarities.map(value => <Checkbox type="rarity" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Element" type="element" value={elements.join(SEPARATOR)} />
            {elements.map(value => <Checkbox type="element" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Speciality" type="weapon" value={weapons.join(SEPARATOR)} />
            {weapons.map(value => <Checkbox type="weapon" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Race" type="race" value={races.join(SEPARATOR)} />
            {races.map(value => <Checkbox type="race" key={value} value={value} />)}
          </li>
          <li>
            <AllCheckbox label="Style" type="style" value={styles.join(SEPARATOR)} />
            {styles.map(value => <Checkbox type="style" key={value} value={value} />)}
          </li>
        </Inputs>
        <footer>
          <button onClick={() => { this.handleReset(); }}>{t('form.reset')}</button>
          <span>{label}</span>
        </footer>
      </form>
    );
  }
}
Form.propTypes = {
  t: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Inputs = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default connect(() => ({}))(translate()(Form));
