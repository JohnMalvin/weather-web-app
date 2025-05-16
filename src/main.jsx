import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import WeatherWithDescription from './App2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherWithDescription />
    {/* <Forecast /> */}
  </StrictMode>,
)
