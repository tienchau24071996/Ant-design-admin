import { UserTableType } from "./UserTable.type";

const initialState = {
  user: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const userTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTableType.getListUserRequest: {
      return { ...state, isLoading: true };
    }
    case UserTableType.getListUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        user: action.response
      };
    }
    case UserTableType.getListUserFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "fail"
      }; 
    }

    case UserTableType.deleteUserRequest: {
        return {...state, isLoading: false}
    }
    case UserTableType.deleteUserSuccess: {
        return {
            ...state,
            isLoading: true,
            error: false,
            errorMessage: "",
            user: state.user.filter(item => item.key !== action.response)
        }
    }
    case UserTableType.deleteUserFailure: {
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
