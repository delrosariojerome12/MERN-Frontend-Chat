import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </Router>
);
