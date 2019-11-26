import {AdminUpdateType} from "./AdminUpdate.type"
import axios from "axios"

const GetAdminRequest = () => ({
    type: AdminUpdateType.GetAdminRequest
})

const GetAdminSuccess = response => ({
    type: AdminUpdateType.GetAdminSucccess,
    response
})

const GetAdminFailure = error => ({
    type: AdminUpdateType.GetAdminFailure,
    error
})

export const onGetAdmin = callback => {
    return async dispatch => {
        try {
            dispatch(GetAdminRequest())
            const id = onGetId()
            const response = await axios.get(`http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${id}`)
            callback && callback(response.data)                     
             dispatch(GetAdminSuccess(response.data))                          
        } 
        catch (error) {
            return dispatch(GetAdminFailure(error))
        }
    }
}

const onGetId = () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get("id");
    return id
}

const UpdateAdminRequest = () => ({
    type: AdminUpdateType.UpdateAdminRequest
})

const UpdateAdminSucccess = response => ({
    type: AdminUpdateType.UpdateAdminSucccess,
    response
})

const UpdateAdminFailure = (error) => ({
    type: AdminUpdateType.UpdateAdminFailure,
    error
})

export const onUpdateAdmin = data => {
    return async dispatch => {
        try {
            dispatch(UpdateAdminRequest())
            const response = await axios.put(
                `http://5dcb85f734d54a0014315051.mockapi.io/api/admin/${data.id}`, data
              )
              return dispatch(UpdateAdminSucccess(response.data));
        } catch (error) {
            return dispatch(UpdateAdminFailure(error))
        }   
    }
}