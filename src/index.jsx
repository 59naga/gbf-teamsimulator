import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';
import List from './components/list';

import './index.styl';

window.addEventListener('DOMContentLoaded', () => {
  render(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <List />
        </ConnectedRouter>
      </Provider>
    ), document.querySelector('main'),
  );
});
