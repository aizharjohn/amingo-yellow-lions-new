import React from 'react';
const Card = prop => {
  const myStyle = {
    width: '15rem'
  };
  return (
    <div className='card card-margin' style={myStyle}>
      <img
        src={prop.image}
        className='card-img-top card-round'
        alt='My Image'
      />
      <div className='card-body'>
        <h3 className='card-title'>{prop.title}</h3>
        <p className='card-text'>{prop.description}</p>
      </div>
    </div>
  );
};
export default Card;
