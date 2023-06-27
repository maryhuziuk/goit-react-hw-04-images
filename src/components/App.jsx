import React, { useState, useEffect } from 'react';
import { fetchImages } from 'api/api.servises';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { StyledApp } from 'App.styled';
import { toast } from 'react-toastify';
import { ToastWrapper } from './ToastContainer/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';




export const App = () => {
  const [query, setQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    const { type, message } = notification;
    const handleNotification = () => {
      const { type, message } = notification;
      if (type === 'info') {
        toast.info(message);
      }
      else if (type === 'error') {
        toast.error(message);
      }
      else if (type === 'success') {
        toast.success(message);
      }
  
    };

    if (type && message) {
      handleNotification();
    }
  }, [notification]);

  useEffect(() => {
    const addImages = async () => {
      if (query === null)
        return
      
      setStatus('pending' );
    
        try {
          const { images: newImages, totalImages: newTotalImages } = await fetchImages(query, page);
    
          if (newImages.length === 0) {
            setNotification({
              type: 'error',
              message: 'Sorry, there are no images matching your search query. Please try again.',
            });
          }
          if (newImages.length !== 0 && page === 1) {
            setNotification ({
                type: 'success',
                message: `Hooray! We found ${newTotalImages} images.`,
            });
          }
    
          if (newTotalImages > 0 && page !== 1 && newTotalImages <= page*12 + 1) {
            setNotification({
              type: 'info',
              message: 'You have reached the end of search results.',
            });
          }
    
          setImages(prevImages => [...prevImages, ...newImages]);
          setStatus('resolved');
          setTotalImages(newTotalImages);
        }  catch (error) {
          console.log(error.message);
          setNotification({
            type: 'error',
            message: 'There are some problems! Try again later.',
          });
          setStatus('rejected');
        }
      };
    
    addImages();
  }, [page, query]);


  const handleSearch = value => {
    if (!value) {
      setNotification({
          type: 'info',
          message: 'Please enter your search query!',
      });
      return;
    }

    if (value === query) {
      setNotification({
          type: 'info',
          message:
            'You are seeing the images by this query. Please, change your query.',
      });
      return;
    }

    setQuery(value);
    setImages([]);
    setPage(1);
    setNotification({
      type: '',
      message: '',
    });
    setStatus('idle');
  };


 const onLoadMore = () => {
  setPage(prevPage => prevPage + 1);
};


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