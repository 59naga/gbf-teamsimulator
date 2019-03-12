// @flow
import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import ReactModal from 'react-modal';

import i18n from '../misc/i18n';

const githubUrl = 'https://github.com/59naga/gbf-teamsimulator';
const twitterUrl = 'https://twitter.com/horse_n_game';

type Props = {
  t: Function,
  title: string,
};
type State = {
  showModal: boolean,
};

class Component extends React.Component<Props, State> {
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

        // https://github.com/reactjs/react-modal/issues/98
        style={{ overlay: { zIndex: 1000 } }}
      >
        <header>
          <button onClick={this.handleCloseModal}>☓ Close</button>
          <h1>{title}</h1>
          <p>
            {t('language')}:
            <button onClick={() => { i18n.changeLanguage('en'); }} > en </button>
            ／
            <button onClick={() => { i18n.changeLanguage('ja'); }} > ja </button>
          </p>
          <pre>{t('greet')}</pre>
          <p>
            {t('developer')}:
            <a href={twitterUrl} target="_blank" rel="noreferrer noopener"> 獄長 </a>
            ／
            <a href={githubUrl} target="_blank" rel="noreferrer noopener"> github </a>
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
  { withRef: true },
)(translate(undefined, { withRef: true })(Component));
