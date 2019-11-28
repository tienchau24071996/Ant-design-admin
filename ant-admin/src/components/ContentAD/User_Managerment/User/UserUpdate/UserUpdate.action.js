import { UserUpdateType } from "./UserUpdate.type";
import axios from "axios";

const getUserRequest = () => ({
  type: UserUpdateType.GetUserRequest
});

const getUserSuccess = response => ({
  type: UserUpdateType.GetUserSuccess,
  response
});

const getUserFailure = error => ({
  type: UserUpdateType.GetUserFailure,
  error
});

export const onGetUser = callback => {
  return async dispatch => {
    try {
      dispatch(getUserRequest());
      const response = await axios.get(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${getInfoURL()}`
      );
      callback && callback(response.data)
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
  type: UserUpdateType.UpdateUserRequest
});

const updateUserSuccess = response => ({
  type: UserUpdateType.UpdateUserSuccess,
  response
});

const updateUserFailure = error => ({
  type: UserUpdateType.UpdateUserFailure,
  error
});

export const onUpdateUser = data => {
  return async dispatch => {
    try {
      dispatch(updateUserRequest());
      const response = await axios.put(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${data.id}`, data
      )
     
        return dispatch(updateUserSuccess(response.data));
    } catch (error) {
      return dispatch(updateUserFailure(error));
    }
  };
};
