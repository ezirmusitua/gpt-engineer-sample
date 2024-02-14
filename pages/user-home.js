import { useState } from 'react';
import { useRouter } from 'next/router';
import ImageUploadForm from '../components/ImageUploadForm';
import ImageGallery from '../components/ImageGallery';

const UserHome = () => {
  const router = useRouter();
  const [userImages, setUserImages] = useState([]);

  // This function will be updated to handle the response from the API route
  const handleImageUpload = (response) => {
    if (response.success) {
      setUserImages([...userImages, response.image]);
    } else {
      alert(response.message);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div>
      <ImageUploadForm onImageUpload={handleImageUpload} />
      <ImageGallery images={userImages} />
      <button onClick={() => router.push('/square')}>Go to Square</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserHome;