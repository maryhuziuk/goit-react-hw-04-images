import { Modal } from 'components/Modal/Modal.jsx';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled.js';
import React, { useState } from 'react';
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

    return (
      <>
        <GalleryItem className="gallery-item" onClick={toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={toggleModal}
          />
        )}
      </>
    );
  }

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};