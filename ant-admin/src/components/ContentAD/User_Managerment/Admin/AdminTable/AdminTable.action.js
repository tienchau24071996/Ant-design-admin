import { AdminTableType } from "./AdminTable.type";
import axios from "axios";

const GetListAdminRequest = () => ({
  type: AdminTableType.GetListAdminRequest
})

const GetListAdminSuccess = response => ({
  type: AdminTableType.GetListAdminSucccess,
  response
})

const GetListAdminFailure = error => ({
  type: AdminTableType.GetListAdminFailure,
  error
})

export const onGetListAdmin = page => {
  return async dispatch => {
    try {
      dispatch(GetListAdminRequest());
      const response = await axios.get(
        `http://5dcb85f734d54a0014315051.mockapi.io/api/admin?page=${page}&limit=10`
      );
      const data = formatData(response.data)
      return dispatch(GetListAdminSuccess(data))
    } catch (error) {
      return dispatch(GetListAdminFailure(error));
    }
  };
};

const formatData = adminList => {
    return adminList.map(item => ({
    id: item.id,
    key: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    gender: item.gender,
    country: item.country,
    email: item.email,
    birthday: item.birthday,
    company: item.company,
  }));
}

const DeleteAdminRequest = () => ({
    type: AdminTableType.DeleteAdminRequest
})

const DeleteAdminSuccess = response => ({
    type: DeleteAdminSuccess,
    response
})

const DeleteAdminFailure = error => ({
    type: DeleteAdminFailure,
    error
})

export const onDeleteAdmin = (key,callback) => {
    return async dispatch => {
        try{
          dispatch(DeleteAdminRequest());
          await axios.delete(
            `http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${key}`
          );
          callback && callback()
          return (
            dispatch(DeleteAdminSuccess(key))
          )
        }
        catch (error) {
            return dispatch(DeleteAdminFailure(error))
        }
    }
}