import {useState} from "react"

const ImageUploadForm = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        onImageUpload(await response.json());
      } else {
        alert('Failed to upload image.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
    </form>
  );
};

export default ImageUploadForm;