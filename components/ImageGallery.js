const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={URL.createObjectURL(image)} alt={image.name} />
        </div>
      ))}
      <style jsx>{`
        .image-gallery {
          display: flex;
          flex-wrap: wrap;
        }
        .image-item {
          width: 200px;
          margin: 10px;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;