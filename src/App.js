import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";

import "./App.css";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/login" component={Login} />
    </>
  );
}

export default App;
