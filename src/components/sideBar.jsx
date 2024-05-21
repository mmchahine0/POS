import React from "react";
import "../styles/sideBar.css";

const Sidebar = () => {
  const icon = "https://picsum.photos/200/202";
  const images = [
    { src: "https://picsum.photos/200/200", alt: "Image 1" },
    { src: "https://picsum.photos/200/200", alt: "Image 2" },
    { src: "https://picsum.photos/200/200", alt: "Image 3" },
    { src: "https://picsum.photos/200/200", alt: "Image 4" },
    { src: "https://picsum.photos/200/200", alt: "Image 5" },
    { src: "https://picsum.photos/200/200", alt: "Image 6" },
  ];

  const handleImageClick = (alt) => {
    alert(`${alt} clicked`);
  };

  const handleButtonClick = (button) => {
    alert(`${button} clicked`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icon">
        <img src={icon} alt="Icon" />
      </div>
      <div className="sidebar-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="sidebar-image"
            onClick={() => handleImageClick(image.alt)}
          />
        ))}
      </div>
      <div className="sidebar-buttons">
        <button
          className="sidebar-button"
          onClick={() => handleButtonClick("Button 1")}
        >
          Button 1
        </button>
        <button
          className="sidebar-button"
          onClick={() => handleButtonClick("Button 2")}
        >
          Button 2
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
