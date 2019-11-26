import { AdminUpdateType } from "./AdminUpdate.type";

const initialState = {
  dataAdmin: {},
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const adminUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminUpdateType.GetAdminRequest: {
      return {
        ...state,
        isLoading: true
      };
    }

    case AdminUpdateType.GetAdminSucccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        dataAdmin: action.response
      };
    }

    case AdminUpdateType.GetAdminFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Fail"
      };
    }

    case AdminUpdateType.UpdateAdminRequest: {
      return {
        ...state,
        isLoading: true
      };
    }

    case AdminUpdateType.UpdateAdminSucccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        dataAdmin: action.response
      };
    }

    case AdminUpdateType.UpdateAdminFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Fail"
      };
    }
    default:
      return state;
  }
};
