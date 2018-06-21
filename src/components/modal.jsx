import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import ReactModal from 'react-modal';

import i18n from '../i18n';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { t, title } = this.props;
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick
      >
        <header>
          <button onClick={this.handleCloseModal}>☓ Close</button>
          <h1>{title}</h1>
          <p>
            {t('language')}:
            <button onClick={() => { i18n.changeLanguage('en'); }}>en</button>
            ／
            <button onClick={() => { i18n.changeLanguage('ja'); }}>ja</button>
          </p>
          <pre>{t('greet')}</pre>
          <p>
            {t('developer')}:
            <a href="https://twitter.com/horse_n_game" target="_blank" rel="noreferrer noopener">ゴブロのケツ（獄長）</a>
                ／
            <a href="https://github.com/59naga/gbf-teamsimulator" target="_blank" rel="noreferrer noopener">github</a>
          </p>
        </header>
      </ReactModal>
    );
  }
}
Modal.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect((state => state), null, null, { withRef: true })(translate(null, { withRef: true })(Modal));
