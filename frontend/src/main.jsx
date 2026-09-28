import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ApplicationSessionProvider } from "./Context/ApplicationSessionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApplicationSessionProvider>
          <App />
        </ApplicationSessionProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
