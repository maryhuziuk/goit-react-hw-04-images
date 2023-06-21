import React from "react";
import {ThreeDots}  from "react-loader-spinner";
import { StyledLoader } from "./Loader.styled";



export const Loader = () => {
  return (
    <StyledLoader>
      <ThreeDots  color="#00BFFF" height={80} width={80} />
    </StyledLoader>
  );
};