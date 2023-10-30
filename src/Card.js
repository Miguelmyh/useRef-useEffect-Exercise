import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({ value, suit, image }) => {
  const [position, setPosition] = useState("");
  useEffect(() => {
    const randomPosition = () => {
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      return `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
    };
    setPosition(randomPosition());
  }, []);
  return (
    <div className="Card">
      <img src={image} style={{ transform: position }} />
    </div>
  );
};

export default Card;
