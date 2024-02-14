import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageUploadForm from '../components/ImageUploadForm';
import ImageGallery from '../components/ImageGallery';

const UserHome = () => {
  useEffect(() => {
    // Redirect to login if no token is found in localStorage
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }

    const fetchUserImages = async () => {
      const token = localStorage.getItem('token');
      try {
        const userId = 'admin'; // Replace with actual logic to get the current user's ID
        const response = await fetch(`/api/user-images?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user images');
        }
        const data = await response.json();
        setUserImages(data.images || []);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserImages();
  }, []);
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