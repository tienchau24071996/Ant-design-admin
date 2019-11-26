import { AdminAddType } from "./AdminAdd.type";
import axios from "axios";

const UpAdminRequest = () => ({
  type: AdminAddType.UpAdminRequest
});

const UpAdminSuccess = response => ({
  type: AdminAddType.UpAdminSuccess,
  response
});

const UpAdminFailure = error => ({
  type: AdminAddType.UpAdminFailure,
  error
});

export const onUpAdmin = data => {
  return async dispatch => {
    try {
      dispatch(UpAdminRequest());
      const response = await axios.post(
        `http://5dcb85f734d54a0014315051.mockapi.io/api/admin/`,
        data
      );
      return dispatch(UpAdminSuccess(response.data));
    } catch (error) {
      return dispatch(UpAdminFailure());
    }
  };
};
