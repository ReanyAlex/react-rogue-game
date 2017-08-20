import React from 'react';

const Enemy = props =>  {


  return (
    <div className={props.view}
          style={ { backgroundImage: props.sprite ? "url('../images/enemy.jpg')" : 'none' } }>
    </div>
  );
}


export default Enemy;
