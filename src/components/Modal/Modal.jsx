import { Component } from 'react';

import { Overlay, ModalContent } from './Modal.styled.js';
import PropTypes from 'prop-types';


export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalContent className="modal">
          <img src={largeImageURL} alt={alt} />
        </ModalContent>
      </Overlay>
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};