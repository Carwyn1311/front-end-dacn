// MenuSlider.tsx
import React, { useState } from 'react';
import '../.css/MenuSlider.css';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

interface MenuSliderProps {
  slides: Slide[];
  onUpdateSlides: (updatedSlides: Slide[]) => void;
}

const MenuSlider: React.FC<MenuSliderProps> = ({ slides, onUpdateSlides }) => {
  const [currentSlide, setCurrentSlide] = useState<Slide>({ image: '', title: '', subtitle: '', price: '' });
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSlide({ ...currentSlide, [name]: value });
  };

  const handleAddSlide = () => {
    onUpdateSlides([...slides, currentSlide]);
    setCurrentSlide({ image: '', title: '', subtitle: '', price: '' });
  };

  const handleEditSlide = (index: number) => {
    setCurrentSlide(slides[index]);
    setIsEditing(index);
  };

  const handleSaveEdit = () => {
    if (isEditing !== null) {
      const updatedSlides = [...slides];
      updatedSlides[isEditing] = currentSlide;
      onUpdateSlides(updatedSlides);
      setIsEditing(null);
      setCurrentSlide({ image: '', title: '', subtitle: '', price: '' });
    }
  };

  const handleDeleteSlide = (index: number) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    onUpdateSlides(updatedSlides);
  };

  return (
    <div className="menu-slider">
      <h2>Manage Slides</h2>
      <div className="form">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={currentSlide.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={currentSlide.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={currentSlide.subtitle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={currentSlide.price}
          onChange={handleInputChange}
        />

        {isEditing !== null ? (
          <button onClick={handleSaveEdit}>Save Edit</button>
        ) : (
          <button onClick={handleAddSlide}>Add Slide</button>
        )}
      </div>

      <ul>
        {slides.map((slide, index) => (
          <li key={index}>
            <p><strong>Title:</strong> {slide.title}</p>
            <p><strong>Subtitle:</strong> {slide.subtitle}</p>
            <p><strong>Price:</strong> {slide.price}</p>
            <button onClick={() => handleEditSlide(index)}>Edit</button>
            <button onClick={() => handleDeleteSlide(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSlider;
