import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import List from './components/list';

import './index.styl';

window.addEventListener('DOMContentLoaded', () => {
  render(<Provider store={store}><List /></Provider>, document.querySelector('main'));
});
