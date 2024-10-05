import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Entrance from './Entrance.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Entrance />
  </StrictMode>,
)
