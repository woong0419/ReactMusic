import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";

import "./App.css";
import Login from "./routes/Login";

function App() {
  const [hasToken, setHasToken] = useState(false);
  const userToken = localStorage.getItem("access_token");
  const [isLoading, setLoading] = useState(true);
  // const decoded = jwt_decode(userToken);
  useEffect(() => {
    if (userToken) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    setLoading(false);
  }, [userToken]);

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          {hasToken ? <Navigation></Navigation> : <Redirect to="/login" />}
          {console.log(userToken, hasToken)}
          {/* <Navigation /> */}
          <Switch>
            <Route
              exact
              path="/login"
              render={() => {
                return <Login></Login>;
              }}
            />
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
