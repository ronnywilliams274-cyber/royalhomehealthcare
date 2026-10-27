import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { initMotionClass } from './hooks/useMotion'

initMotionClass()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered to static HTML (scripts/prerender.mjs) and hydrated here
// when the prerendered route matches the current URL pathname.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
if (root.firstElementChild && root.dataset.prerenderPath === currentPath) {
  hydrateRoot(root, app)
} else {
  root.innerHTML = ''
  createRoot(root).render(app)
}

;(window as Window & { __rhhcReady?: boolean }).__rhhcReady = true
