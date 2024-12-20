/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { persistor,store } from "shared";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

  <BrowserRouter>
    <ArgonControllerProvider>
      <PerfectScrollbar>
        <App />
      </PerfectScrollbar>
    </ArgonControllerProvider>
  </BrowserRouter>
  </PersistGate>
  </Provider>
);




/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "App";

// // Soft UI Context Provider
// import { ArgonControllerProvider } from "context";

// // react-perfect-scrollbar component
// import PerfectScrollbar from "react-perfect-scrollbar";
// import { HashRouter } from "react-router-dom";

// // react-perfect-scrollbar styles
// import "react-perfect-scrollbar/dist/css/styles.css";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(
//   <HashRouter>
//     <ArgonControllerProvider>
//       <PerfectScrollbar>
//         <App />
//       </PerfectScrollbar>
//     </ArgonControllerProvider>
//   </HashRouter>
// );
