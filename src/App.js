import React, { Component } from 'react';
//
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Modal from './components/Modal';
import Error from './components/Error';
//
import { fetchImages } from './services/pixabayApi';
//
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    selectedImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  handleSubmit = newQuery => {
    this.setState({
      images: [],
      query: newQuery,
      page: 1,
      error: null,
      selectedImg: '',
      showModal: false,
    });
  };

  getImages = () => {
    const { query, page } = this.state;

    const options = {
      query,
      page,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  setLargeImg = image => {
    this.setState({ selectedImg: image.largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, isLoading, showModal, selectedImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <Container>
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                setLargeImg={this.setLargeImg}
              />
            ))}
          </ImageGallery>
          {error && <Error message={error.message} />}
          {isLoading && (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={80}
              width={80}
              className="loader"
            />
          )}
        </Container>
        {images.length >= 12 && !isLoading && (
          <Button onLoadMore={this.getImages} />
        )}
        {showModal && (
          <Modal largeImgUrl={selectedImg} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
