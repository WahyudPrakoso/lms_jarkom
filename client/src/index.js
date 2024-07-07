// import React from 'react'
// import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

// import App from './App'
import store from './store'

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
     <Provider store={store}>
       <App />
     </Provider>,
    </AuthContextProvider>
  </React.StrictMode>
);

