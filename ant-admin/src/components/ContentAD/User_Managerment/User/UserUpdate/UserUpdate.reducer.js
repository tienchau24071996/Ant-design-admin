import { UserUpdateType } from "./UserUpdate.type";

const initialState = {
  userDetail: {},
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserUpdateType.getUserRequest: {
      return { ...state, isLoading: true };
    }

    case UserUpdateType.getUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        userDetail: action.response
      };
    }

    case UserUpdateType.getUserFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "fail"
      };
    }

    case UserUpdateType.updateUserRequest: {
      return { ...state, isLoading: true };
    }

    case UserUpdateType.updateUserSuccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        userDetail: action.response
      };
    }

    case UserUpdateType.updateUserFailure: {
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
