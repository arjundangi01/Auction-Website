import React from "react";
import style from "./spinner.module.css";
import PlaceholderLoading from "react-placeholder-loading";
export const Spinner = () => {
  return <div className={style.loader}></div>;
};
export const ProductBannerLoading = () => {
  return <PlaceholderLoading shape="rect" width={'100%'} height={'100%'} />;
};
