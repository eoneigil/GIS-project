import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import Vxod from './Vxod.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Vxod />
  </StrictMode>,
)
