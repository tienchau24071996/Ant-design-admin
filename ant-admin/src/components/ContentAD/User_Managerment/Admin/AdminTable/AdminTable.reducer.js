import { AdminTableType } from "./AdminTable.type";

const initialState = {
  dataAdmin: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const adminTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminTableType.GetListAdminRequest: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AdminTableType.GetListAdminSucccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        dataAdmin: action.response
      };
    }

    case AdminTableType.GetListAdminFailure: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: "Fail"
      };
    }
    case AdminTableType.DeleteAdminRequest: {
      return {
        ...state,
        isLoading: true
      };
    }
    case AdminTableType.DeleteAdminSucccess: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        dataAdmin: state.dataAdmin.filter(item => item.key !== action.response)
      };
    }
    case AdminTableType.DeleteAdminFailure: {
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
