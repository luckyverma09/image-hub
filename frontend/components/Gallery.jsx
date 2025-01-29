import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch images from backend when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/images', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the JWT token for authorization
          },
        });
        setImages(data); // Set images for the logged-in user
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };
    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async () => {
    if (!selectedImage) return; // Ensure selectedImage is set
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/images/${selectedImage._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the JWT token for authorization
        },
      });
      setImages(images.filter((image) => image._id !== selectedImage._id));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting image:', error.response ? error.response.data : error.message);
      alert('Error deleting image: ' + (error.response ? error.response.data.msg : error.message));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      handleCloseModal();
    }
  };

  const handleShareImage = async () => {
    if (!selectedImage) return; // Ensure selectedImage is set
    try {
      await navigator.clipboard.writeText(selectedImage.url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide message after 2 seconds
    } catch (error) {
      console.error('Error copying URL:', error);
      alert('Error copying URL: ' + error.message);
    }
  };

  return (
    <div className={`gallery-container ${selectedImage ? 'no-hover' : ''} bg-black`}>
      <div className='max-w-6xl mx-auto p-4 h-full'>
        <h2 className='text-3xl font-semibold mb-4 text-white'>Gallery</h2>

        {/* Display message if no images */}
        {images.length === 0 ? (
          <p className='text-white'>You don't have any uploaded images.</p>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}>
            {images.map((image) => (
              <div
                key={image._id}
                className='relative mb-6'
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.url}
                  alt='uploaded'
                  className='w-full h-auto rounded-md'
                  style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className='modal' onClick={handleOutsideClick}>
          <div
            className='modal-content'
            style={{
              width: selectedImage.width ? `${selectedImage.width}px` : '90vw',
              height: selectedImage.height ? `${selectedImage.height}px` : '90vh',
              maxWidth: '90vw', // Ensure modal doesn't stretch beyond screen
              maxHeight: '90vh', // Ensure modal doesn't stretch beyond screen
            }}
          >
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <img
              src={selectedImage.url}
              alt='selected'
              className='modal-image w-full h-full object-cover'
              style={{ maxHeight: '80vh', maxWidth: '90vw', objectFit: 'contain' }} // Ensure the image fits inside the modal
            />
            <button onClick={handleDeleteImage} className='delete-button' disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button onClick={handleShareImage} className='share-button'>
              {isCopied ? 'URL copied!' : 'Share'}
            </button>
            <button onClick={handleCloseModal} className='close-button'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
