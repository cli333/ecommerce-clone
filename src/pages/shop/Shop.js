import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collection-overview/CollectionOverview";

const Shop = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
  </div>
);

export default Shop;
