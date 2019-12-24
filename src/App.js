import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";

const SecretPage = ({
  match: {
    params: { id }
  }
}) => (
  <div>
    <h1>You've found {id}'s secret page!</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/secret/:id" component={SecretPage} />
      </Switch>
    </div>
  );
}

export default App;
