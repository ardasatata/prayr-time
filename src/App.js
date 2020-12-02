import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Prayer from './Views/Prayer'


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/">
            <Prayer />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
