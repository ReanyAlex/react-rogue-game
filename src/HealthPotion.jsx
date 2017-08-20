import React from 'react';

const HealthPotion = props =>  {
  return (
    <div className={props.view}
      style={ { backgroundImage: props.sprite ? "url('../images/health.png')" : 'none' } }>
    </div>
  );
}


export default HealthPotion;
