import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/pages/App'

import 'alertifyjs/build/css/themes/bootstrap.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import 'alertifyjs/build/css/alertify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
