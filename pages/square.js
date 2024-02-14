import { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';

const Square = () => {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    // Fetch all images from the server (mocked here with local state)
    // In a real application, this would be an API call.
    setAllImages([
      // ...images fetched from the server
    ]);
  }, []);

  return <ImageGallery images={allImages} />;
};

export default Square;