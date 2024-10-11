import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import './index.css'
import './i18n';
import 'leaflet/dist/leaflet.css';
import { ContextProvider } from './context/contextProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
)
