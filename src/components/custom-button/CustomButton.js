import React from "react";
// import "./CustomButton.scss";
import { CustomButtonContainer } from "./CustomButtonStyles";

const CustomButton = props => (
  <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
);

export default CustomButton;
