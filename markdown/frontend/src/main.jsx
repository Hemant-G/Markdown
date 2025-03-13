  import { StrictMode } from "react";
  import { Auth0Provider } from "@auth0/auth0-react";
  import { createRoot } from "react-dom/client";
  import { BrowserRouter, Routes, Route } from "react-router";
  import "./index.css";
  import App from "./App.jsx";
  import Home from "./Components/Home.jsx";
  import Profile from "./Components/Profile.jsx";

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  createRoot(document.getElementById("root")).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/markdown",
        audience: audience
      }}  
                                                                               
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markdown" element={<App />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
