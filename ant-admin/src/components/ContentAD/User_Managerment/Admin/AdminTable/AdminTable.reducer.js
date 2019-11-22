import {AdminTableType} from "./AdminTable.type"

const initialState = {
    dataAdmin: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export const adminTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case AdminTableType.getListAdminRequest: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case AdminTableType.getListAdminSucccess: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
                dataAdmin: action.response
            }
        }

        case AdminTableType.getListAdminFailure: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "Fail"
            }
        }
        case AdminTableType.deleteAdminRequest: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case AdminTableType.deleteAdminSucccess: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: ""
            }
        }
        case AdminTableType.deleteAdminFailure: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "Fail"
            }
        }
        default:
            return state
    }
}