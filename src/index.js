import 'modern-normalize/modern-normalize.css'
import 'bulma/css/bulma.css'

import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './app/App'
import { persistor, store } from './redux/store'

const appElementID = 'root'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById(appElementID)
)
