import React from 'react';

const Weapon = props =>  {

  if (props.spriteLocation < 400) {
    return (
      <div className={props.view}
           style={{backgroundImage: "url('../images/wooden-sword.jpg')"}}>
      </div>
    );
  } else if (props.spriteLocation < 800) {
    return (
      <div className={props.view}
           style={{backgroundImage: "url('../images/steel-sword.jpg')"}}>
      </div>
    );
  } else if (props.spriteLocation < 1200) {
    return (
      <div className={props.view}
           style={{backgroundImage: "url('../images/axe.jpg')"}}>
      </div>
    );
  } else if (props.spriteLocation < 1600) {
    return (
      <div className={props.view}
           style={{backgroundImage: "url('../images/pickle.jpg')"}}>
      </div>
    );
  } else {
    return (
      <div className={props.view}>
      </div>
    );
  }

}


export default Weapon;
