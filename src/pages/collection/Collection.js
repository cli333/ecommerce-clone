import React from "react";
import "./Collection.scss";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/CollectionItem";
import { selectCollection } from "../../redux/shop/shop-selector";

const Collection = ({ collection: { title, items } }) => (
  <div className="collection-page">
    <h2 className="title">{title} page</h2>
    <div className="items">
      {items.map(item => (
        <CollectionItem key={item.id} {...item} />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(Collection);
