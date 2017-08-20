import React from 'react';

const Hero = props =>  {

  const avatarStyle ={
  backgroundImage: "url('../images/hero.jpg')",
  };

  return (
    <div className="hero" style={avatarStyle}>
    </div>
  );
}


export default Hero;
