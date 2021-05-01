import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import NewReleases from "./routes/NewReleases";
import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/" exact={true} component={NewReleases} />
      <Route path="/newreleases" component={NewReleases} />
    </>
  );
}

export default App;
