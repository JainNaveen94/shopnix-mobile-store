import React from "react";
import appCSS from "./App.css";

import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <div className={appCSS.App}>
    <Layout>
      {/* <Switch>
        <Route path="/new-order" exact component={BurgerBuilder} />
        <Route path="/check-out" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Redirect from="/" to="/new-order" exact />
        <Route render={() => <p>Not Found</p>} />
      </Switch> */}
      <h1>Main Page</h1>
    </Layout>
  </div>
  )
}
export default App;
