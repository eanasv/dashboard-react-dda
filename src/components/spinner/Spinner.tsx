import React from "react";
import { useSelector } from "react-redux";

export const Spinner = () => {
  //   const isLoading = useSelector((state) => state.);
  const isLoading = useSelector((state: any) => state.loader.isLoading);

  return <div>Spinner</div>;
};
