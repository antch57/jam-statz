import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-brand-bg-dark via-brand-bg-light to-brand-bg-dark">
        <App />
      </div>
  </React.StrictMode>
);
