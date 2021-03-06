import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import i18n from './misc/i18n';
import store, { history } from './misc/store';
import List from './containers/list';

window.addEventListener('DOMContentLoaded', () => {
  render(
    (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <List />
          </ConnectedRouter>
        </Provider>
      </I18nextProvider>
    ), document.querySelector('main'),
  );
});
