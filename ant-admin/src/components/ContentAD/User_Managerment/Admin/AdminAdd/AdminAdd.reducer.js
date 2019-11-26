import {AdminAddType} from "./AdminAdd.type"

const initialState = {
    dataAdmin: {},
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export const adminAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case AdminAddType.UpAdminRequest: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case AdminAddType.UpAdminSuccess: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: ""
                
            }
        }
        case AdminAddType.UpAdminFailure: {
            return {
                ...state,
                isLoading:false,
                isError:true,
                errorMessage: "Fail"
            }
        }
        default:
            return state
    }
}