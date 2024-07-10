import React from 'react'
import {BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import {store} from "./store.js"
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { CartProvider } from "react-use-cart";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <CartProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </CartProvider>
  </Provider>
)
