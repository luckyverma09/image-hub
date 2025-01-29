import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null); // Add state for image preview

  const handleImageUpload = async () => {
    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Add the image file to the FormData

    setIsUploading(true); // Set uploading state to true

    try {
      await axios.post('http://localhost:5000/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the JWT token for authorization
        },
      });
      alert('Image uploaded successfully');
      setFile(null); // Reset the file input
      setPreview(null); // Clear the image preview
    } catch (error) {
      console.error('Image upload failed', error);
    } finally {
      setIsUploading(false); // Set uploading state to false
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null); // Reset the preview if no file is selected
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <div className='flex-grow flex items-center justify-center'>
        <div className='max-w-md mx-auto p-8 border rounded-lg shadow-lg bg-[#262626] mt-[-40px]'>
          <h2 className='text-2xl font-bold text-center mb-4 text-white'>Upload Image</h2>
          {preview && <img src={preview} alt='Image Preview' className='mb-4 w-full h-auto' />}
          <input
            type='file'
            onChange={handleFileChange} // Use the new file change handler
            className='mb-4 p-2 border rounded-md w-full bg-[#333] text-white'
            disabled={isUploading} // Disable input while uploading
          />
          <button
            onClick={handleImageUpload}
            className={`w-full p-3 ${
              isUploading ? 'bg-gray-500' : 'bg-[#ffa31a]'
            } text-white rounded-md hover:bg-[#ffb84d]`}
            disabled={isUploading} // Disable button while uploading
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
