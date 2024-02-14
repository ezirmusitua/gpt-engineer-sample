import {useState} from "react"

const ImageUploadForm = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      const response = await fetch('/api/upload', {
        method: 'POST',
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
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;