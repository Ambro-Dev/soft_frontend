/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.soft.ambro.dev
* Copyright 2023 Ambro-Dev (https://www.ambro.dev)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "App";

// Soft UD - Demo Context Provider
import { SoftUIControllerProvider } from "context";
import { AuthProvider } from "context/AuthProvider";
import { SocketProvider } from "context/socket";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SocketProvider>
          <I18nextProvider i18n={i18n}>
            <SoftUIControllerProvider>
              <Routes>
                <Route path="/*" element={<App />} key="app" />
              </Routes>
            </SoftUIControllerProvider>
          </I18nextProvider>
        </SocketProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
