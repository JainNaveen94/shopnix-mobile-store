import React from "react";
import appCSS from "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";

import Products from "./containers/Products/Products";

function App() {
  return (
    <div className={appCSS.App}>
      <Layout>
        <Switch>
          <Route path="/products" exact component={Products} />
          <Redirect from="/" to="/products" exact />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
        {/* <h1>Main Page</h1> */}
      </Layout>
    </div>
  );
}
export default App;
