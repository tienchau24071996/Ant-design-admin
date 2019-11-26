import { UserTableType } from "./UserTable.type";

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const userTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTableType.GetListUserRequest: {
      return { ...state, isLoading: true };
    }
    case UserTableType.GetListUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        user: action.response
      };
    }
    case UserTableType.GetListUserFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "fail"
      }; 
    }

    case UserTableType.DeleteUserRequest: {
        return {...state, isLoading: false}
    }
    case UserTableType.DeleteUserSuccess: {
        return {
            ...state,
            isLoading: true,
            error: false,
            errorMessage: "",
            user: state.user.filter(item => item.key !== action.response)
        }
    }
    case UserTableType.DeleteUserFailure: {
        return{
            ...state,
            isLoading: false,
            isError: true,
            errorMessage:"fail"
        }
    }
    default:
      return state;
  }
};
