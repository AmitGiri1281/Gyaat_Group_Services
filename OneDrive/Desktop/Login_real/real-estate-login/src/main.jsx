import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/global.css'   // Corrected the path
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
