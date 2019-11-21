import { UserUpdateType } from "./UserUpdate.type";
import axios from "axios";

const getUserRequest = () => ({
  type: UserUpdateType.getUserRequest
});

const getUserSuccess = response => ({
  type: UserUpdateType.getUserSuccess,
  response
});

const getUserFailure = error => ({
  type: UserUpdateType.getUserFailure,
  error
});

export const onGetUser = () => {
  return async dispatch => {
    try {
      dispatch(getUserRequest());
      const response = await axios.get(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${getInfoURL()}`
      );
      return dispatch(getUserSuccess(response.data));
    } catch (error) {
      return dispatch(getUserFailure(error));
    }
  };
};

const getInfoURL = () => {
  const url = window.location;
  const urlString = new URL(url);
  const id = urlString.searchParams.get("id");
  return id;
};

const updateUserRequest = () => ({
  type: UserUpdateType.updateUserRequest
});

const updateUserSuccess = response => ({
  type: UserUpdateType.updateUserSuccess,
  response
});

const updateUserFailure = error => ({
  type: UserUpdateType.updateUserFailure,
  error
});

export const onUpdateUser = data => {
  return async dispatch => {
    try {
      dispatch(updateUserRequest());
      const response = await axios.put(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${data.id}`, data
      )
      if(response.status === 200) {
        return dispatch(updateUserSuccess(response.data));
      } else {
        return dispatch(updateUserFailure("Some thing went wrong!"));
      }
    } catch (error) {
      return dispatch(updateUserFailure(error));
    }
  };
};
