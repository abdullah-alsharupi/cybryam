 // استبدل '#yourAppElement' بالمعرف الخاص بعنصر التطبيق
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from 'react-modal';

Modal.setAppElement('#_next'); // استبدل '#yourAppElement' بالمعرف الخاص بعنصر التطبيق

ReactDOM.render(<App />, document.getElementById('root'));