import { UserUpdateType } from "./UserUpdate.type";

const initialState = {
  userDetail: {},
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserUpdateType.GetUserRequest: {
      return { ...state, isLoading: true };
    }

    case UserUpdateType.GetUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        userDetail: action.response
      };
    }

    case UserUpdateType.GetUserFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "fail"
      };
    }

    case UserUpdateType.UpdateUserRequest: {
      return { ...state, isLoading: true };
    }

    case UserUpdateType.UpdateUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        userDetail: action.response
      };
    }

    case UserUpdateType.UpdateUserFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "fail"
      };
    }

    default:
      return state;
  }
};
