import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

document.querySelector('.button').addEventListener("click", function reset(){

  window.location.reload()
})
