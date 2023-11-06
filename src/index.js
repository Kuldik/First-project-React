import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App/>,
  // React.createElement('button', {
  //   onClick: () => {
  //     console.log('CLICK');
  //   }
  // }, 'Click me'),
  // Для упрощения и улучшения лучшей читаемости кода существует JSX,
  // Который упрощает написание HTML кода в JS файле
  // Например:
  
  // <button 
  //   onClick={() => console.log('CLICK!')}>Click me
  // </button>,

  document.getElementById('root')
)