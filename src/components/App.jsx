import { Component } from 'react';
import { fetchImages } from 'api/api.servises';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { StyledApp } from 'App.styled';
import { toast } from 'react-toastify';
import { ToastWrapper } from './ToastContainer/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';




export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalImages: 0,
    status: 'idle', 
    notification: { type: '', message: '' }, 
  };

  componentDidUpdate(_, prevState) {
    const { query, page, notification } = this.state;
    const { addImages, handleNotification } = this;

    if (prevState.query !== query || prevState.page !== page) {
      addImages();
    }

    if (notification.type && notification.message) {
      handleNotification();
    }
  }

  handleNotification = () => {
    const notificationType = this.state.notification.type;
    const notificationMessage = this.state.notification.message;

    if (notificationType === 'info') {
      toast.info(notificationMessage);
    }
    else if (notificationType === 'error') {
      toast.error(notificationMessage);
    }
    else if (notificationType === 'success') {
      toast.success(notificationMessage);
    }

    this.setState({
      notification: { type: '', message: '' },
    });
  };

  handleSearch = value => {
    if (!value) {
      this.setState({
        notification: {
          type: 'info',
          message: 'Please enter your search query!',
        },
      });
      return;
    }

    if (value === this.state.query) {
      this.setState({
        notification: {
          type: 'info',
          message:
            'You are seeing the images by this query. Please, change your query.',
        },
      });
      return;
    }

    this.setState({
      query: value,
      images: [],
      page: 1,
      notification: {
        type: '',
        message: '',
      },
      status: 'idle',
    });
  };

  addImages = async () => {
    const { query, page } = this.state;

    this.setState({ status: 'pending' });

    try {
      const { images, totalImages } = await fetchImages(query, page);

      if (images.length === 0) {
        this.setState({
          notification: {
            type: 'error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          },
        });
      }
      if (images.length !== 0 && page === 1) {
        this.setState({
          notification: {
            type: 'success',
            message: `Hooray! We found ${totalImages} images.`,
          },
        });
      }

      if (
        totalImages > 0 &&
        page !== 1 &&
        totalImages <= this.state.images.length + 12
      ) {
        this.setState({
          notification: {
            type: 'info',
            message: 'You have reached the end of search results.',
          },
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: 'resolved',
        totalImages,
      }));
    } catch (error) {
      console.log(error.message);
      this.setState({
        notification: {
          type: 'error',
          message: 'There are some problems! Try again later.',
        },
        status: 'rejected',
      });
    }
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, status, page, totalImages } = this.state;
    const { handleSearch, onLoadMore } = this;

    return (
      <StyledApp>
        <Searchbar onSubmit={handleSearch} />

        {status === 'pending' && <Loader />}

        {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
          <ImageGallery images={images} />
        )}

        {((totalImages !== images.length && status === 'resolved') ||
          (status === 'pending' && page > 1)) && (
          <Button onClick={onLoadMore} />
        )}

        <ToastWrapper />
      </StyledApp>
    );
  }
}