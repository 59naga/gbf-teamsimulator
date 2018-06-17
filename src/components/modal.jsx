import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactModal from 'react-modal';

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
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick
      >
        <header>
          <button onClick={this.handleCloseModal}>☓ Close</button>
          <h1>{this.props.title}</h1>
          <p>得意武器検索めんどくさいから作った</p>
          <p>
                開発者:
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
  title: PropTypes.string.isRequired,
};

export default connect((state => state), null, null, { withRef: true })(Modal);
