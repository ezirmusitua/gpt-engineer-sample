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
    <div className="container mx-auto p-6">
      <ImageUploadForm onImageUpload={handleImageUpload} />
      <ImageGallery images={userImages} />
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform motion-safe:hover:scale-105 transition ease-in-out duration-300" onClick={() => router.push('/square')}>Go to Square</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform motion-safe:hover:scale-105 transition ease-in-out duration-300" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserHome;