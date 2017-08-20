import React from 'react';


const Boss = props =>  {
  return (
    <div className={props.view}
      style={ { backgroundImage: props.sprite ? "url('../images/boss.jpg')" : 'none' } }>
    </div>
  );
}


export default Boss;
