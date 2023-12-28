import React from "react";
import '../css/Card.css';

const Card = (props) => {
  return <div class="card-container">
    <div className="card">{props.children}</div>
    </div>;
};

export default Card;