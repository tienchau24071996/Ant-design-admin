import { AdminTableType } from "./AdminTable.type";
import axios from "axios";

const getListAdminRequest = () => ({
  type: AdminTableType.getListAdminRequest
});

const getListAdminSuccess = response => ({
  type: AdminTableType.getListAdminSucccess,
  response
});

const getListAdminFailure = error => ({
  type: AdminTableType.getListAdminFailure,
  error
});

export const onGetListAdmin = page => {
  return async dispatch => {
    try {
      dispatch(getListAdminRequest());
      const response = await axios.get(
        `http://5dcb85f734d54a0014315051.mockapi.io/api/admin?page=${page}&limit=10`
      );
      const data = formatData(response.data)
      return dispatch(getListAdminSuccess(data))
    } catch (error) {
      return dispatch(getListAdminFailure(error));
    }
  };
};

const formatData = adminList => {
    return adminList.map(item => ({
    id: item.id,
    key: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    Gender: item.Gender,
    Country: item.Country,
    Email: item.Email,
    Birthday: item.Birthday,
    Company: item.Company,
    GevmeEmail: item.GevmeEmail,
    Premium: item.Premium ? "Yes" : "No"
  }));
};

const deleteAdminRequest = () => ({
    type: AdminTableType.deleteAdminRequest
});

const deleteAdminSuccess = () => ({
    type: deleteAdminSuccess
});

const deleteAdminFailure = error => ({
    type: deleteAdminFailure,
    error
})

export const onDeleteAdmin = () => {
    return async dispatch => {
        try{
          dispatch(deleteAdminRequest());
        }
        catch (error) {
            return dispatch(deleteAdminFailure(error))
        }
    }
}