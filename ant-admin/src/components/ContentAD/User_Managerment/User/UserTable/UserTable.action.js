import { UserTableType } from "./UserTable.type";
import axios from "axios";

const getListUserRequest = () => ({
  type: UserTableType.GetListUserRequest
});

const getListUserSuccess = response => ({
  type: UserTableType.GetListUserSuccess,
  response
});

const getListUserFailure = error => ({
  type: UserTableType.GetListUserFailure,
  error
});

export const onGetListUser = page => {
  return async dispatch => {
    try {
      dispatch(getListUserRequest());
      const response = await axios.get(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient?p=${page}&l=10`
      );
      const data = formatData(response.data);
      return dispatch(getListUserSuccess(data));
    } catch (error) {
      return getListUserFailure(error);
    }
  };
};

const formatData = userList => {
  return userList.map(item => ({
    key: item.id,
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    country: item.country,
    email: item.email,
    birthday: item.birthday,
    companyName: item.companyName,
    gevmeEmail: item.gevmeEmail,
    isPremium: item.isPremium ? "Yes" : "No",
  }));
}

const deleteUserRequest = () => ({
  type: UserTableType.DeleteUserRequest
});

const deleteUserSuccess = response => ({
  type: UserTableType.DeleteUserSuccess,
  response
});

const deleteUserFailure = error => ({
  type: UserTableType.DeleteUserFailure,
  error
});

export const onDeleteUser = (key, callback) => {
  return async dispatch => {
    try {
      dispatch(deleteUserRequest());
      await axios.delete(
        `https://5dca88d434d54a00143146f9.mockapi.io/api/v1/userClient/${key}`
      );
      callback && callback()
      return dispatch(deleteUserSuccess(key));
    } catch (error) {
      return deleteUserFailure(error);
    }
  };
};
