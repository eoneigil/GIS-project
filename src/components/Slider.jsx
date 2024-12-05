import { useState } from 'react';
import './ImageSlider.css'; // Подключите отдельный CSS для стиля слайдера

const ImageSlider = ({ images, overlay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-slider">
      <button onClick={handlePrevImage} className="slider-button">
        &#9664;
      </button>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        onLoad={() => {
          if (overlay) {
            const coordinates = overlay.getPosition();
            overlay.setPosition(coordinates);
          }
        }}
        onError={() => console.error('Ошибка загрузки изображения')}
      />
      <button onClick={handleNextImage} className="slider-button">
        &#9654;
      </button>
    </div>
  );
};

export default ImageSlider;
