// @flow
import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import ReactModal from 'react-modal';

import i18n from '../i18n';

type Props = {
  t: Function,
  title: string,
};
type State = {
  showModal: boolean,
};

class Modal extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { showModal: false };
    // HACK: https://github.com/facebook/flow/issues/5874
    (this: any).handleOpenModal = this.handleOpenModal.bind(this);
    (this: any).handleCloseModal = this.handleCloseModal.bind(this);
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
            <button
              onClick={() => {
                i18n.changeLanguage('en');
              }}
            >
              en
            </button>
            ／
            <button
              onClick={() => {
                i18n.changeLanguage('ja');
              }}
            >
              ja
            </button>
          </p>
          <pre>{t('greet')}</pre>
          <p>
            {t('developer')}:
            <a href="https://twitter.com/horse_n_game" target="_blank" rel="noreferrer noopener">
              ゴブロのケツ（獄長）
            </a>
            ／
            <a href="https://github.com/59naga/gbf-teamsimulator" target="_blank" rel="noreferrer noopener">
              github
            </a>
          </p>
        </header>
      </ReactModal>
    );
  }
}

export default connect(
  state => state,
  null,
  null,
  { withRef: true }
)(translate(undefined, { withRef: true })(Modal));
