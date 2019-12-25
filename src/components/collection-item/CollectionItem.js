import React from "react";
import "./CollectionItem.scss";
import { connect } from "react-redux";

import CustomButton from "../custom-button/CustomButton";
import { addItem } from "../../redux/cart/cart-action";

const CollectionItem = ({ id, name, price, imageUrl, addItem }) => {
  const item = { id, name, price, imageUrl };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => addItem(item)}>
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
