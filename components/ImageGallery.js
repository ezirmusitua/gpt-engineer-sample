const ImageGallery = ({ images }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
    {images.map((image, index) => (
      <div key={index} className="overflow-hidden rounded-lg shadow-md">
        <img src={image.path} alt={`Uploaded image ${index}`} className="w-full h-auto object-cover object-center" />
      </div>
    ))}
  </div>
);

export default ImageGallery;