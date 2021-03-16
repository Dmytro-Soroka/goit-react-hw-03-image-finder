import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, setLargeImg }) => {
  const { webformatURL, tags } = image;

  return (
    <li className={styles.ImageGalleryItem} onClick={() => setLargeImg(image)}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles['ImageGalleryItem-image']}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  setLargeImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
