import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Store from "./pages/Store";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory"
import AddProductForm from "./Components/Forms/AddProductForm";
import ProductGroup from "./Components/Products/ProductGroup";
import Product from "./Components/Products/Product";
import EditProductForm from "./Components/Forms/EditProductForm";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route exact path="/store/:productFilter/:productId">
          <Product />
        </Route>
        
        <Route exact path="/store/:productFilter">
          <ProductGroup />
        </Route>

        <Route path="/store">
          <Store />
        </Route>

  

        <Route path="/inventory" exact>
          <Inventory />
        </Route>
        <Route path="/inventory/add" exact>
          <AddProductForm />
        </Route>

        <Route exact path="/inventory/:productId">
          <EditProductForm />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
