import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-gm25vgkj8uwj1vck.us.auth0.com"
    clientId="WJe1skWfLLzcKKsftxsyqXs6mCdIHWV6"
    authorizationParams={{
      redirect_uri:"http://127.0.0.1:5173"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
