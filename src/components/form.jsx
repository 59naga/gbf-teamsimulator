// @flow
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { translate } from 'react-i18next';
import upperCase from 'upper-case';

import { elements, weapons, rarities, races, styles } from '../misc/defines';
import AllCheckbox from './all-checkbox';
import Checkbox from './checkbox';
import Modal from './modal';

import { Form, FormFooter, Inputs } from './_styles';

type Props = {
  t: Function,
  count: string,
  action: string,
  dispatch: Function,
};

const title = `${upperCase(NAME).replace(/-/g, ' ')} v${VERSION}`;

class Component extends React.Component<Props> {
  handleReset() {
    this.props.dispatch(push('/'));
  }
  modal: ?{ getWrappedInstance: Function };
  render() {
    const { t, count, action } = this.props;
    const disabled = window.location.hash.length <= 2;
    return (
      <Form>
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
        <FormFooter>
          <button disabled={disabled} onClick={() => { window.open(action, '_blank'); }}>{t('team.share')}</button>
          <span>{count}</span>
          <button onClick={() => { this.handleReset(); }}>
            {t('form.reset')}
          </button>
          <Modal ref={(modal: any) => { this.modal = modal; }} title={title} />
          <button
            onClick={() => {
              if (this.modal == null) return;
              this.modal.getWrappedInstance().getWrappedInstance().handleOpenModal();
            }}
          >
            {t('options')}
          </button>
        </FormFooter>
      </Form>
    );
  }
}

export default connect(() => ({}))(translate()(Component));
