import { UserTableType } from "./UserTable.type";
import axios from "axios";

const editUserRequest = () => ({
  type: UserTableType.getListUserRequest
});

const editUserSuccess = response => ({
  type: UserTableType.getListUserSuccess,
  response
});

const editUserFailure = error => ({
  type: UserTableType.getListUserFailure,
  error
});

export const onGetListUser = page => {
  return async dispatch => {
    try {
      dispatch(editUserRequest());
      const response = await axios.get(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient?p=${page}&l=10`
      );
      const data = formatData(response.data);
      return dispatch(editUserSuccess(data));
    } catch (error) {
      return editUserFailure(error);
    }
  };
};

const formatData = userList => {
  return userList.map(item => ({
    key: item.id,
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    gender: item.gender,
    country: item.country,
    email: item.email,
    birthday: item.birthday,
    companyName: item.companyName,
    gevmeEmail: item.gevmeEmail,
    isPrenium: item.isPrenium ? "Yes" : "No"
  }));
};

const deleteUserRequest = () => ({
  type: UserTableType.deleteUserRequest
});

const deleteUserSuccess = response => ({
  type: UserTableType.deleteUserSuccess,
  response
});

const deleteUserFailure = error => ({
  type: UserTableType.deleteUserFailure,
  error
});

export const onDeleteUser = key => {
  return async dispatch => {
    try {
      dispatch(deleteUserRequest());
      const response = await axios.delete(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${key}`
      );
       response.status === 200 ? dispatch(deleteUserSuccess(key)) : deleteUserFailure()
    } catch (error) {
      return deleteUserFailure(error);
    }
  };
};
