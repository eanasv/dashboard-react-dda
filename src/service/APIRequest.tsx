import axios from "axios";
import * as configVariable from "./Config";
import { useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../redux/features/loaderSlice";
import store from "../redux/Store";
import { createAction } from "@reduxjs/toolkit";

export const getHttp = (url, params?) => {
  // const dispatch = useDispatch();

  store.dispatch(showLoader());
  //var responseGet;
  const getResponse = axios
    .get(configVariable.baseUrl + url, {
      params: params ? params : null,
    })
    .then((response) => {
      store.dispatch(hideLoader());

      return response.data;
    })
    .catch((error) => {
      store.dispatch(hideLoader());
      //return error;
    });

  return getResponse;

  //   try {
  //     const response = await axios.get(configVariable.baseUrl + url);
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
};

export const postHttp = (url, formData) => {
  //event.preventDefault();
  store.dispatch(showLoader());

  const postResponse = axios
    .post(configVariable.baseUrl + url, formData)
    .then((response) => {
      store.dispatch(hideLoader());

      console.log("Data submitted successfully!", response.data);
      if (response.status == 200) {
        return response.data;
      }
    })
    .catch((error) => {
      store.dispatch(hideLoader());

      console.error("Error submitting data:", error);
      //return error;
    });
  return postResponse;
};
