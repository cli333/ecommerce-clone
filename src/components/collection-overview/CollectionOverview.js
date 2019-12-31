import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./CollectionOverview.scss";

import { selectShopCollections } from "../../redux/shop/shop-selector";
import CollectionPreview from "../collection-preview/CollectionPreview";

const CollectionOverview = ({ collections }) => (
  <div className="collection-overview">
    {collections.map(collection => (
      <CollectionPreview key={collection.id} {...collection} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections
});

export default connect(mapStateToProps)(CollectionOverview);
