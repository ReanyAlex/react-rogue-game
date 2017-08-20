import React from 'react';

const NextFloor = props =>  {

  return (
    <div className={props.view}
      style={ { backgroundImage: props.sprite ? "url('../images/stairs.jpeg')" : 'none' } }>
    </div>
  );
}


export default NextFloor;
